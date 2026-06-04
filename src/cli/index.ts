/* eslint-disable no-console */
// Bundled CLI for admin/ops tasks. Compiled to build/cli.mjs by esbuild
// (see `pnpm build:cli`) and invoked in prod via:
//   docker compose exec app node /app/build/cli.mjs <command>
// Locally during development, run via tsx: `pnpm cli <command>`.

import { defineCommand, runMain } from 'citty';
import { config } from '../lib/utils/config.runtime';
import { createDb } from '../lib/store/db';
import { appendAction, createDecision } from '../lib/store/decisionRepository';
import { createMigrator } from '../lib/store/migrator';
import { bundledMigrationProvider } from '../lib/store/migrations.bundled';
import {
  sampleActions,
  sampleDecisionId,
  sampleInitialMetadata,
} from '../lib/test_data/actions';
import { sampleUser, sampleUserId } from '../lib/test_data/user';

function migrator() {
  return createMigrator(config.databasePath, bundledMigrationProvider);
}

const migrate = defineCommand({
  meta: { name: 'migrate', description: 'Run all pending migrations.' },
  async run() {
    const { error, results } = await migrator().migrateToLatest();
    results?.forEach((it) => {
      const mark = it.status === 'Success' ? '✔' : it.status === 'Error' ? '✘' : '·';
      console.log(`  ${mark} ${it.migrationName} (${it.direction}) — ${it.status}`);
    });
    if (error) {
      console.error('\nMigration failed:', error);
      process.exit(1);
    }
    console.log(results?.length ? '\nDone.' : 'Nothing to do — all migrations already applied.');
  },
});

const migrateStatus = defineCommand({
  meta: { name: 'migrate:status', description: 'Show applied vs pending migrations.' },
  async run() {
    const all = await migrator().getMigrations();
    if (!all.length) {
      console.log('No migrations registered.');
      return;
    }
    for (const m of all) {
      const state = m.executedAt ? `applied ${m.executedAt.toISOString()}` : 'pending';
      console.log(`  ${m.name} — ${state}`);
    }
  },
});

const migrateDown = defineCommand({
  meta: { name: 'migrate:down', description: 'Roll back the most recent migration.' },
  async run() {
    const { error, results } = await migrator().migrateDown();
    results?.forEach((it) => {
      console.log(`  ${it.migrationName} (${it.direction}) — ${it.status}`);
    });
    if (error) {
      console.error('\nRollback failed:', error);
      process.exit(1);
    }
  },
});

const seed = defineCommand({
  meta: {
    name: 'seed',
    description: 'Insert the sample decision into the DB. Idempotent.',
  },
  async run() {
    const db = createDb(config.databasePath);
    try {
      const existing = await db
        .selectFrom('decisions')
        .select('id')
        .where('id', '=', sampleDecisionId)
        .executeTakeFirst();

      if (existing) {
        console.log(
          `Sample decision ${sampleDecisionId} already present at ${config.databasePath}; skipping.`,
        );
        return;
      }

      const now = new Date().toISOString();

      const existingUser = await db
        .selectFrom('user')
        .select('id')
        .where('id', '=', sampleUserId)
        .executeTakeFirst();
      if (!existingUser) {
        await db
          .insertInto('user')
          .values({ ...sampleUser, createdAt: now, updatedAt: now })
          .execute();
      }

      await createDecision(sampleDecisionId, sampleInitialMetadata, now, sampleUserId, db);
      for (const action of sampleActions) {
        await appendAction(sampleDecisionId, action, now, sampleUserId, db);
      }
      console.log(
        `Seeded ${sampleActions.length + 1} actions into ${config.databasePath}.`,
      );
    } finally {
      await db.destroy();
    }
  },
});

const main = defineCommand({
  meta: { name: 'wsid', description: 'wsid admin CLI' },
  subCommands: {
    migrate,
    'migrate:status': migrateStatus,
    'migrate:down': migrateDown,
    seed,
  },
});

runMain(main);
