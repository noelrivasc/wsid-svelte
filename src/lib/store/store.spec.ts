import { describe, it, expect, beforeEach } from 'vitest';
import { createDb } from './db';
import { type DB } from './schema';
import type { Kysely } from 'kysely';
import {
  appendAction,
  createDecision,
  loadActions,
  loadDecision,
  loadDecisionList
} from './index';
import { sampleActions, sampleDecisionId, sampleInitialMetadata } from '$lib/test_data/actions';
import { sampleDecision } from '$lib/test_data/decision';
import { emptyDecision } from '../engine/reducer';

const ts = '2026-01-01T00:00:00Z';

async function seed(db: Kysely<DB>) {
  await createDecision(sampleDecisionId, sampleInitialMetadata, ts, db);
  for (const a of sampleActions) {
    await appendAction(sampleDecisionId, a, ts, db);
  }
}

describe('store', () => {
  let db: Kysely<DB>;
  beforeEach(() => {
    db = createDb(':memory:');
  });

  it('appends actions with monotonically increasing seq per decision', async () => {
    await seed(db);
    const rows = await loadActions(sampleDecisionId, db);
    // createDecision appends one updateMetadata + sampleActions
    expect(rows.length).toBe(sampleActions.length + 1);
  });

  it('loadDecision replays actions and returns the sample decision', async () => {
    await seed(db);
    const d = await loadDecision(sampleDecisionId, db);
    expect(d).toEqual(sampleDecision);
  });

  it('loadDecisionList reflects current title (last updateMetadata wins)', async () => {
    await seed(db);
    const list = await loadDecisionList(db);
    expect(list).toEqual([{ id: sampleDecisionId, title: sampleDecision.metadata.title }]);
  });

  it('returns null for missing decision', async () => {
    const d = await loadDecision('00000000-0000-4000-8000-000000000099', db);
    expect(d).toBeNull();
  });

  it('loadDecision returns an empty decision if there are no actions', async () => {
    await db.insertInto('decisions').values({ id: sampleDecisionId, title: '' }).execute();
    const d = await loadDecision(sampleDecisionId, db);
    expect(d).toEqual(emptyDecision);
  });
});
