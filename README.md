# wsid-svelte

SvelteKit + TypeScript implementation of WSID, an event-sourced decision-modelling tool. State is derived by replaying an action log into a pure reducer. SQLite (via Kysely) for storage, better-auth magic links for auth, Tailwind v4 for theming.

## Quick start

Requires Node 22+ and pnpm; Docker is optional (dockerised app and mailpit).

```sh
pnpm install
cp .env.example .env
pnpm migrate                # creates data/wsid.db
pnpm dev                    # http://localhost:5173
```

## Dev environment

### Plain pnpm

Run each process in its own terminal:

```sh
pnpm dev           # app          → http://localhost:5173
pnpm serve-docs    # docs         → http://localhost:8081
pnpm storybook     # storybook    → http://localhost:6006
pnpm mail:docker   # mailpit      → http://localhost:8125 (needs Docker)
```

For the dockerised app, use `pnpm dev:docker` (→ http://localhost:3000) in place of `pnpm dev`.

### tmux

`./tmux-setup.sh` spins up the whole dev environment — editor, agent, and the app/docs/storybook/mailpit processes — in a single tmux session (macOS). Beyond the Quick start deps, this needs `tmux`, plus `nvim` and `claude` for the tools window (and Docker, since mailpit always runs in a container).

```sh
just up        # setup + tools + dev processes, then attach
```

Run `just --list` for all recipes, or `./tmux-setup.sh` with no args to see the script's sub-commands.

## Documentation

See [`docs/index.html`](docs/index.html) for the full map — setup (Vite and Docker), code layout, stack, auth, event sourcing, CLI, deployment, and agent notes.
