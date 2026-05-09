import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { sqlSchema, type DB } from './schema';


export function createDb(path: string): Kysely<DB> {
  const sqlite = new Database(path);
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.exec(sqlSchema);
  return new Kysely<DB>({ dialect: new SqliteDialect({ database: sqlite }) });
}

let _db: Kysely<DB> | null = null;

// SvelteKit entrypoint: reads DATABASE_PATH from $env at first call.
export async function getConnection(): Promise<Kysely<DB>> {
  if (_db) return _db;
  // TODO: move env to centralized config
  const { env } = await import('$env/dynamic/private');
  _db = createDb(env.DATABASE_PATH ?? 'wsid.db');
  return _db;
}
