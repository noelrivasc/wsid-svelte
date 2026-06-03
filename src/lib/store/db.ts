import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { config } from '$lib/utils/config';
import { type DB } from './schema';

import type { Database as SqliteDatabase } from 'better-sqlite3';

export function createSqlite(path: string): SqliteDatabase {

  mkdirSync(dirname(path), { recursive: true });
  const sqlite = new Database(path);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
  sqlite.pragma('foreign_keys = ON');
  return sqlite;
}

let _sqlite: SqliteDatabase | null = null;

export function getSqlite(path?: string): SqliteDatabase {
  path = path ?? config.databasePath;

  if (_sqlite) return _sqlite;
  _sqlite = createSqlite(path);
  return _sqlite;
}

export function createDb(path?: string): Kysely<DB> {
  return new Kysely<DB>({ dialect: new SqliteDialect({ database: getSqlite(path) }) });
}

let _db: Kysely<DB> | null = null;

export async function getConnection(): Promise<Kysely<DB>> {
  if (_db) return _db;
  _db = createDb();
  return _db;
}
