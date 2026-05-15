import type { Kysely } from 'kysely';
import { getConnection } from './db';
import { type DB } from './schema';

export { getConnection } from './db';
export type { DB } from './schema';
import { actionSchema, type Action } from '$lib/schemas';
import type { DecisionMetadata } from '$lib/schemas';
import { config } from '$lib/utils/config';

export interface DecisionListItem {
  id: string;
  title: string;
}

export async function loadDecisionList(db?: Kysely<DB>): Promise<DecisionListItem[]> {
  const c = db ?? (await getConnection());
  return c.selectFrom('decisions').select(['id', 'title']).orderBy('title').execute();
}

// Returns null if the decision does not exist, [] if it exists with no actions.
export async function loadActions(
  decisionId: string,
  db?: Kysely<DB>
): Promise<Action[] | null> {
  const c = db ?? (await getConnection());
  const rows = await c
    .selectFrom('decisions as d')
    .leftJoin('actions as a', 'a.decision_id', 'd.id')
    .select(['a.type', 'a.version', 'a.payload', 'a.seq'])
    .where('d.id', '=', decisionId)
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
  decisionId: string,
  metadata: DecisionMetadata,
  createdAt: string,
  db?: Kysely<DB>
): Promise<void> {
  const c = db ?? (await getConnection());
  await c.transaction().execute(async (tx) => {
    await tx
      .insertInto('decisions')
      .values({ id: decisionId, title: metadata.title })
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
}

// Append an action onto an existing decision. createdAt is supplied by caller
// so the reducer/replay path stays pure. Retries on PK conflict (LWW).
export async function appendAction(
  decisionId: string,
  action: Action,
  createdAt: string,
  db?: Kysely<DB>
): Promise<{ seq: number }> {
  actionSchema.parse(action);
  const c = db ?? (await getConnection());

  const maxRetries = config.appendActionMaxRetries;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await c.transaction().execute(async (tx) => {
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
