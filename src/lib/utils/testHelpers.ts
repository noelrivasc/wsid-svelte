import Database from 'better-sqlite3';
import { Kysely, Migrator, SqliteDialect } from 'kysely';
import { type DB } from '$lib/store/schema';
import { bundledMigrationProvider } from '$lib/store/migrations.bundled';

export async function createFreshDb(): Promise<Kysely<DB>> {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  const db = new Kysely<DB>({ dialect: new SqliteDialect({ database: sqlite }) });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const migrator = new Migrator({ db: db as Kysely<any>, provider: bundledMigrationProvider });
  const { error } = await migrator.migrateToLatest();
  if (error) throw error;
  return db;
}
