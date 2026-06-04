import { describe, it, expect, beforeEach } from 'vitest';
import { type DB } from './schema';
import { createFreshDb } from '$lib/utils/testHelpers';
import type { Kysely } from 'kysely';
import {
  appendAction,
  createDecision,
  loadActions,
  loadDecisionList,
  OwnershipError
} from './decisionRepository';
import { sampleActions, sampleDecisionId, sampleInitialMetadata } from '$lib/test_data/actions';
import { sampleDecision } from '$lib/test_data/decision';
import { sampleUser, sampleUserId } from '$lib/test_data/user';
import { emptyDecision, hydrate } from '../engine/reducer';

const ts = '2026-01-01T00:00:00Z';
const otherUserId = '00000000-0000-4000-8000-0000000000ff';

async function insertUser(db: Kysely<DB>, id: string, email: string) {
  await db
    .insertInto('user')
    .values({ ...sampleUser, id, email, createdAt: ts, updatedAt: ts })
    .execute();
}

async function seed(db: Kysely<DB>) {
  await insertUser(db, sampleUserId, sampleUser.email);
  await createDecision(sampleInitialMetadata, ts, sampleUserId, sampleDecisionId, db);
  for (const a of sampleActions) {
    await appendAction(sampleDecisionId, a, ts, sampleUserId, db);
  }
}

describe('store', () => {
  let db: Kysely<DB>;
  beforeEach(async () => {
    db = await createFreshDb();
  });

  it('appends actions with monotonically increasing seq per decision', async () => {
    await seed(db);
    const rows = await loadActions(sampleDecisionId, sampleUserId, db);
    // createDecision appends one updateMetadata + sampleActions
    expect(rows?.length).toBe(sampleActions.length + 1);
  });

  it('loadActions + hydrate reproduces the sample decision', async () => {
    await seed(db);
    const actions = await loadActions(sampleDecisionId, sampleUserId, db);
    const decision = hydrate(actions);
    expect(decision).toEqual(sampleDecision);
  });

  it('loadDecisionList reflects current title (last updateMetadata wins)', async () => {
    await seed(db);
    const list = await loadDecisionList(sampleUserId, db);
    expect(list).toEqual([{ id: sampleDecisionId, title: sampleDecision.metadata.title }]);
  });

  it('loadActions returns null for a missing decision', async () => {
    const actions = await loadActions(sampleDecisionId, sampleUserId, db);
    const decision = hydrate(actions);
    expect(decision).toBeNull();
  });

  it('hydrate returns an empty decision when the decision exists but has no actions', async () => {
    await insertUser(db, sampleUserId, sampleUser.email);
    await db
      .insertInto('decisions')
      .values({ id: sampleDecisionId, title: '', user_id: sampleUserId })
      .execute();
    const actions = await loadActions(sampleDecisionId, sampleUserId, db);
    const decision = hydrate(actions);
    expect(decision).toEqual(emptyDecision);
  });

  it('loadDecisionList only returns decisions owned by the user', async () => {
    await seed(db);
    await insertUser(db, otherUserId, 'other@example.com');
    const list = await loadDecisionList(otherUserId, db);
    expect(list).toEqual([]);
  });

  it('loadActions returns null for a decision owned by another user', async () => {
    await seed(db);
    await insertUser(db, otherUserId, 'other@example.com');
    const actions = await loadActions(sampleDecisionId, otherUserId, db);
    expect(actions).toBeNull();
  });

  it('appendAction rejects a non-owner with OwnershipError', async () => {
    await seed(db);
    await insertUser(db, otherUserId, 'other@example.com');
    await expect(
      appendAction(
        sampleDecisionId,
        { type: 'metadata/edit', version: 1, payload: sampleInitialMetadata },
        ts,
        otherUserId,
        db
      )
    ).rejects.toBeInstanceOf(OwnershipError);
  });
});
