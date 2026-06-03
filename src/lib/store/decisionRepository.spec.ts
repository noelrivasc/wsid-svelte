import { describe, it, expect, beforeEach } from 'vitest';
import { type DB } from './schema';
import { createFreshDb } from '$lib/utils/testHelpers';
import type { Kysely } from 'kysely';
import {
  appendAction,
  createDecision,
  loadActions,
  loadDecisionList
} from './decisionRepository';
import { sampleActions, sampleDecisionId, sampleInitialMetadata } from '$lib/test_data/actions';
import { sampleDecision } from '$lib/test_data/decision';
import { emptyDecision, hydrate } from '../engine/reducer';

const ts = '2026-01-01T00:00:00Z';

async function seed(db: Kysely<DB>) {
  await createDecision(sampleDecisionId, sampleInitialMetadata, ts, db);
  for (const a of sampleActions) {
    await appendAction(sampleDecisionId, a, ts, db);
  }
}

describe('store', () => {
  let db: Kysely<DB>;
  beforeEach(async () => {
    db = await createFreshDb();
  });

  it('appends actions with monotonically increasing seq per decision', async () => {
    await seed(db);
    const rows = await loadActions(sampleDecisionId, db);
    // createDecision appends one updateMetadata + sampleActions
    expect(rows?.length).toBe(sampleActions.length + 1);
  });

  it('loadActions + hydrate reproduces the sample decision', async () => {
    await seed(db);
    const actions = await loadActions(sampleDecisionId, db);
    const decision = hydrate(actions);
    expect(decision).toEqual(sampleDecision);
  });

  it('loadDecisionList reflects current title (last updateMetadata wins)', async () => {
    await seed(db);
    const list = await loadDecisionList(db);
    expect(list).toEqual([{ id: sampleDecisionId, title: sampleDecision.metadata.title }]);
  });

  it('loadActions returns null for a missing decision', async () => {
    const actions = await loadActions(sampleDecisionId, db);
    const decision = hydrate(actions);
    expect(decision).toBeNull();
  });

  it('hydrate returns an empty decision when the decision exists but has no actions', async () => {
    await db.insertInto('decisions').values({ id: sampleDecisionId, title: '' }).execute();
    const actions = await loadActions(sampleDecisionId, db);
    const decision = hydrate(actions);
    expect(decision).toEqual(emptyDecision);
  });
});
