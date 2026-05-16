import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { sqlSchema, type DB } from '$lib/store/schema';

export function createFreshDb(): Kysely<DB> {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  sqlite.exec(sqlSchema);
  return new Kysely<DB>({ dialect: new SqliteDialect({ database: sqlite }) });
}
