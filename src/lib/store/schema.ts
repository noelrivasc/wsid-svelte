import sqlSchema from './schema.sql?raw';

export { sqlSchema };

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
