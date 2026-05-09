/* eslint-disable no-console */
// Seed script: populates the dev SQLite DB with the sample decision via the domain lib.
// Run: pnpm seed

import { appendAction, createDb, createDecision } from '../src/lib/store';
import {
	sampleActions,
	sampleDecisionId,
	sampleInitialMetadata
} from '../src/lib/test_data/actions';
import { config } from '../src/lib/utils/config';

const path = config.databasePath;
const db = createDb(path);

const existing = await db
	.selectFrom('decisions')
	.select('id')
	.where('id', '=', sampleDecisionId)
	.executeTakeFirst();

if (existing) {
	console.log(`Sample decision ${sampleDecisionId} already present at ${path}; skipping.`);
} else {
	const now = new Date().toISOString();
	await createDecision(sampleDecisionId, sampleInitialMetadata, now, db);
	for (const action of sampleActions) {
		await appendAction(sampleDecisionId, action, now, db);
	}
	console.log(`Seeded ${sampleActions.length + 1} actions into ${path}.`);
}

await db.destroy();
