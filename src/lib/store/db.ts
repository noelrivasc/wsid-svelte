import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { config } from '$lib/utils/config';
import { sqlSchema, type DB } from './schema';


export function createDb(path: string): Kysely<DB> {
  mkdirSync(dirname(path), { recursive: true });
  const sqlite = new Database(path);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.exec(sqlSchema);
  return new Kysely<DB>({ dialect: new SqliteDialect({ database: sqlite }) });
}

let _db: Kysely<DB> | null = null;

export async function getConnection(): Promise<Kysely<DB>> {
  if (_db) return _db;
  _db = createDb(config.databasePath);
  return _db;
}
