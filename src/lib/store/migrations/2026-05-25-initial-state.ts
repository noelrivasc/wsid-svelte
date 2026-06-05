/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('decisions')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('title', 'text', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('actions')
    .addColumn('decision_id', 'text', (col) =>
      col.references('decisions.id').onDelete('cascade').notNull()
    )
    .addColumn('seq', 'integer', (col) => col.notNull())
    .addColumn('type', 'text', (col) => col.notNull())
    .addColumn('version', 'integer', (col) => col.notNull())
    .addColumn('payload', 'text', (col) => col.notNull())
    .addColumn('created_at', 'text', (col) => col.notNull())
    .addPrimaryKeyConstraint('actions_pk', ['decision_id', 'seq'])
    .execute();

  await db.schema
    .createIndex('actions_by_decision')
    .on('actions')
    .columns(['decision_id', 'seq'])
    .execute();

  await db.schema
    .createTable('user')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .addColumn('emailVerified', 'integer', (col) => col.notNull())
    .addColumn('image', 'text')
    .addColumn('createdAt', 'date', (col) => col.notNull())
    .addColumn('updatedAt', 'date', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('session')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('expiresAt', 'date', (col) => col.notNull())
    .addColumn('token', 'text', (col) => col.notNull().unique())
    .addColumn('createdAt', 'date', (col) => col.notNull())
    .addColumn('updatedAt', 'date', (col) => col.notNull())
    .addColumn('ipAddress', 'text')
    .addColumn('userAgent', 'text')
    .addColumn('userId', 'text', (col) => col.references('user.id').onDelete('cascade').notNull())
    .execute();

  await db.schema
    .createTable('account')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('accountId', 'text', (col) => col.notNull())
    .addColumn('providerId', 'text', (col) => col.notNull())
    .addColumn('userId', 'text', (col) => col.references('user.id').onDelete('cascade').notNull())
    .addColumn('accessToken', 'text')
    .addColumn('refreshToken', 'text')
    .addColumn('idToken', 'text')
    .addColumn('accessTokenExpiresAt', 'date')
    .addColumn('refreshTokenExpiresAt', 'date')
    .addColumn('scope', 'text')
    .addColumn('password', 'text')
    .addColumn('createdAt', 'date', (col) => col.notNull())
    .addColumn('updatedAt', 'date', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('verification')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('identifier', 'text', (col) => col.notNull())
    .addColumn('value', 'text', (col) => col.notNull())
    .addColumn('expiresAt', 'date', (col) => col.notNull())
    .addColumn('createdAt', 'date', (col) => col.notNull())
    .addColumn('updatedAt', 'date', (col) => col.notNull())
    .execute();

  await db.schema.createIndex('session_userId_idx').on('session').column('userId').execute();

  await db.schema.createIndex('account_userId_idx').on('account').column('userId').execute();

  await db.schema
    .createIndex('verification_identifier_idx')
    .on('verification')
    .column('identifier')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex('verification_identifier_idx').execute();
  await db.schema.dropIndex('account_userId_idx').execute();
  await db.schema.dropIndex('session_userId_idx').execute();
  await db.schema.dropIndex('actions_by_decision').execute();
  await db.schema.dropTable('verification').execute();
  await db.schema.dropTable('account').execute();
  await db.schema.dropTable('session').execute();
  await db.schema.dropTable('user').execute();
  await db.schema.dropTable('actions').execute();
  await db.schema.dropTable('decisions').execute();
}
