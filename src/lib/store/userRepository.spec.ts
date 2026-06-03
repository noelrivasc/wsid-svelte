import { describe, it, expect, beforeEach } from 'vitest';
import { type DB } from './schema';
import type { Kysely } from 'kysely';
import { getUserByEmail } from './userRepository';
import type { User } from '$lib/schemas';
import { createFreshDb } from '$lib/utils/testHelpers';

const sampleUser = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
  emailVerified: 1,
  image: null,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-02',
};

describe('userRepository', () => {
  let db: Kysely<DB>;
  beforeEach(async () => {
    db = await createFreshDb();
  });

  it('returns a User for an existing email', async () => {
    await db.insertInto('user').values(sampleUser).execute();

    const user = await getUserByEmail('alice@example.com', db);

    const expected: User = {
      id: 'user-1',
      name: 'Alice',
      email: 'alice@example.com',
      emailVerified: 1,
      image: null,
    };
    expect(user).toEqual(expected);
  });

  it('returns null for a non-existent email (empty database)', async () => {
    const user = await getUserByEmail('alice@example.com', db);
    expect(user).toBeNull();
  });

  it('returns null for a different email than the one seeded', async () => {
    await db.insertInto('user').values(sampleUser).execute();

    const user = await getUserByEmail('bob@example.com', db);
    expect(user).toBeNull();
  });
});
