# wsid-svelte

SvelteKit + TypeScript implementation of WSID, an event-sourced decision-modelling tool. State is derived by replaying an action log into a pure reducer. SQLite (via Kysely) for storage, better-auth magic links for auth, Tailwind v4 for theming.

## Quick start

```sh
pnpm install
cp .env.example .env
pnpm migrate                # creates data/wsid.db
pnpm dev                    # http://localhost:5173
```

## Documentation

See [`docs/index.html`](docs/index.html) for the full map — setup (Vite and Docker), code layout, stack, auth, event sourcing, CLI, deployment, and agent notes.
