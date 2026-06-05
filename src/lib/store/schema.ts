import type { Generated } from 'kysely';

export interface DecisionsTable {
  id: string;
  title: string;
  user_id: string | null;
  is_public: Generated<number>; // 0 | 1 (sqlite boolean); defaults to 0
}

export interface ActionsTable {
  decision_id: string;
  seq: number;
  type: string;
  version: number;
  payload: string; // JSON
  created_at: string; // ISO8601
}

export interface UserTable {
  id: string;
  name: string;
  email: string;
  emailVerified: number;
  image: string | null;
  createdAt: string; // date
  updatedAt: string; // date
}

export interface SessionTable {
  id: string;
  expiresAt: string; // date
  token: string;
  createdAt: string; // date
  updatedAt: string; // date
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}

export interface AccountTable {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  accessTokenExpiresAt: string | null; // date
  refreshTokenExpiresAt: string | null; // date
  scope: string | null;
  password: string | null;
  createdAt: string; // date
  updatedAt: string; // date
}

export interface VerificationTable {
  id: string;
  identifier: string;
  value: string;
  expiresAt: string; // date
  createdAt: string; // date
  updatedAt: string; // date
}

export interface DB {
  decisions: DecisionsTable;
  actions: ActionsTable;
  user: UserTable;
  session: SessionTable;
  account: AccountTable;
  verification: VerificationTable;
}
