import type { Kysely } from 'kysely';
import { getConnection } from './db';
import { type DB } from './schema';
import { userSchema, type User } from '$lib/schemas';

export async function getUserByEmail(email: string, db?: Kysely<DB>): Promise<User | null> {
  const c = db ?? (await getConnection());
  const row = await c.selectFrom('user').selectAll().where('email', '=', email).executeTakeFirst();

  if (!row) return null;

  return userSchema.parse({
    id: row.id,
    name: row.name,
    email: row.email,
    emailVerified: row.emailVerified,
    image: row.image
  });
}
