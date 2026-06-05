// Pure config factory: takes an env object, returns the config map.
// This function has no SvelteKit dependencies and can be used both in
// SvelteKit server code (via config.ts → $env/dynamic/private) and in
// CLI scripts (via config.runtime.ts → process.env).

export function getConfig(env: Record<string, string | undefined>) {
  return {
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
}
