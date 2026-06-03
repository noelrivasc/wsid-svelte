// Static registry of migrations for environments where filesystem-based
// discovery is unavailable (the bundled production CLI). Keys MUST match
// the corresponding filenames in ./migrations (without extension), because
// kysely persists the key in the kysely_migration table and uses it to
// decide what has already run.

import type { Migration, MigrationProvider } from 'kysely';

import * as m20260525InitialState from './migrations/2026-05-25-initial-state';

const migrations: Record<string, Migration> = {
  '2026-05-25-initial-state': m20260525InitialState,
};

export const bundledMigrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations;
  },
};

export const bundledMigrationNames = Object.keys(migrations);
