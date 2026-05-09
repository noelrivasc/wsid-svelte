import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const sqlSchema = readFileSync(
  fileURLToPath(new URL('./schema.sql', import.meta.url)),
  'utf8'
);

export interface DecisionsTable {
  id: string;
  title: string;
}

export interface ActionsTable {
  decision_id: string;
  seq: number;
  type: string;
  version: number;
  payload: string; // JSON
  created_at: string; // ISO8601
}

export interface DB {
  decisions: DecisionsTable;
  actions: ActionsTable;
}
