/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('decisions')
    .addColumn('user_id', 'text', (col) => col.references('user.id').onDelete('cascade'))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('decisions').dropColumn('user_id').execute();
}
