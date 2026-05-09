// Centralized config: read env vars here, provide defaults, import elsewhere.
// Env loading: SvelteKit/Vite auto-loads .env in dev/build; the seed script
// relies on `node --env-file-if-exists=.env` (see package.json `seed`).

export const config = {
	databasePath: process.env.DATABASE_PATH ?? 'data/wsid.db'
} as const;
