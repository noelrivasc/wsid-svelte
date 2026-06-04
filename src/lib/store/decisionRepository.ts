import type { Kysely } from 'kysely';
import { getConnection } from './db';
import { type DB } from './schema';

export { getConnection } from './db';
export type { DB } from './schema';
import { actionSchema, type Action } from '$lib/schemas';
import type { DecisionMetadata } from '$lib/schemas';
// Uses `config.runtime` (process.env) because this module is reached from both
// the SvelteKit server bundle and the standalone CLI bundle. See TODO.md.
import { config } from '$lib/utils/config.runtime';

export interface DecisionListItem {
  id: string;
  title: string;
}

// Thrown when a caller tries to read or mutate a decision they do not own.
export class OwnershipError extends Error {
  constructor(decisionId: string) {
    super(`Decision ${decisionId} is not owned by this user`);
    this.name = 'OwnershipError';
  }
}

export async function loadDecisionList(
  userId: string,
  db?: Kysely<DB>
): Promise<DecisionListItem[]> {
  const c = db ?? (await getConnection());
  return c
    .selectFrom('decisions')
    .select(['id', 'title'])
    .where('user_id', '=', userId)
    .orderBy('title')
    .execute();
}

// Returns null if the decision does not exist or is not owned by userId,
// [] if it exists (and is owned) with no actions.
export async function loadActions(
  decisionId: string,
  userId: string,
  db?: Kysely<DB>
): Promise<Action[] | null> {
  const c = db ?? (await getConnection());
  const rows = await c
    .selectFrom('decisions as d')
    .leftJoin('actions as a', 'a.decision_id', 'd.id')
    .select(['a.type', 'a.version', 'a.payload', 'a.seq'])
    .where('d.id', '=', decisionId)
    .where('d.user_id', '=', userId)
    .orderBy('a.seq')
    .execute();
  if (rows.length === 0) return null;
  if (rows.length === 1 && rows[0].type === null) return [];
  return rows.map((r) =>
    actionSchema.parse({
      type: r.type,
      version: r.version,
      payload: JSON.parse(r.payload as string)
    })
  );
}

// Create the canvas: insert the decisions row and append the first updateMetadata
// action (which is the only thing that ever sets metadata on the canvas).
export async function createDecision(
  metadata: DecisionMetadata,
  createdAt: string,
  userId: string,
  decisionId: string = crypto.randomUUID(),
  db?: Kysely<DB>
): Promise<string> {
  const c = db ?? (await getConnection());
  await c.transaction().execute(async (tx) => {
    await tx
      .insertInto('decisions')
      .values({ id: decisionId, title: metadata.title, user_id: userId })
      .execute();
    await tx
      .insertInto('actions')
      .values({
        decision_id: decisionId,
        seq: 1,
        type: 'metadata/edit',
        version: 1,
        payload: JSON.stringify(metadata),
        created_at: createdAt
      })
      .execute();
  });
  return decisionId;
}

// Append an action onto an existing decision. createdAt is supplied by caller
// so the reducer/replay path stays pure. Retries on PK conflict (LWW).
export async function appendAction(
  decisionId: string,
  action: Action,
  createdAt: string,
  userId: string,
  db?: Kysely<DB>
): Promise<{ seq: number }> {
  actionSchema.parse(action);
  const c = db ?? (await getConnection());

  const maxRetries = config.appendActionMaxRetries;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await c.transaction().execute(async (tx) => {
        const owner = await tx
          .selectFrom('decisions')
          .select('user_id')
          .where('id', '=', decisionId)
          .executeTakeFirst();
        if (!owner || owner.user_id !== userId) throw new OwnershipError(decisionId);

        const row = await tx
          .selectFrom('actions')
          .select((eb) => eb.fn.max('seq').as('max'))
          .where('decision_id', '=', decisionId)
          .executeTakeFirst();
        const nextSeq = ((row?.max as number | null) ?? 0) + 1;

        if (action.type === 'metadata/edit') {
          await tx
            .updateTable('decisions')
            .set({ title: action.payload.title })
            .where('id', '=', decisionId)
            .execute();
        }

        await tx
          .insertInto('actions')
          .values({
            decision_id: decisionId,
            seq: nextSeq,
            type: action.type,
            version: action.version,
            payload: JSON.stringify(action.payload),
            created_at: createdAt
          })
          .execute();

        return { seq: nextSeq };
      });
    } catch (err) {
      const msg = (err as Error).message ?? '';
      if (msg.includes('UNIQUE') && attempt < maxRetries - 1) continue;
      throw err;
    }
  }
  throw new Error('appendAction: exceeded retry budget');
}
