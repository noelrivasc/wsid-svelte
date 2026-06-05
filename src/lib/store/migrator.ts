import Database from 'better-sqlite3';
import { Kysely, Migrator, SqliteDialect, type MigrationProvider } from 'kysely';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Builds a Migrator against a sqlite file. The provider is injected so the
// same runner works for the bundled production CLI (./migrations.bundled)
// and any future in-process callers (e.g. tests using a custom registry).

export function createMigrator(databasePath: string, provider: MigrationProvider): Migrator {
  const sqlite = new Database(databasePath);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
  sqlite.pragma('foreign_keys = ON');

  const db = new Kysely<any>({
    dialect: new SqliteDialect({ database: sqlite })
  });

  return new Migrator({ db, provider });
}
