import { env } from '$env/dynamic/private';

// Centralized config: read env vars here, provide defaults, import elsewhere.
// Env loading: SvelteKit/Vite auto-loads .env in dev/build; the seed script
// relies on `node --env-file-if-exists=.env` (see package.json `seed`).

export const config = {
  databasePath: env.DATABASE_PATH ?? 'data/wsid.db',
  appendActionMaxRetries: Number(env.APPEND_ACTION_MAX_RETRIES ?? 5),
  betterAuthSecret: env.BETTER_AUTH_SECRET ?? '',
  betterAuthUrl: env.BETTER_AUTH_URL ?? 'http://localhost:5173',
  smtp: {
    host: env.SMTP_HOST ?? 'localhost',
    port: Number(env.SMTP_PORT ?? 1025),
    user: env.SMTP_USER ?? '',
    pass: env.SMTP_PASS ?? '',
    from: env.SMTP_FROM ?? 'no-reply@wsid.local'
  }
} as const;
