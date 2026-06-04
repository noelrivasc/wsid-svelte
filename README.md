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

## Dev environment (tmux)

`./tmux-setup.sh` spins up the whole dev environment — editor, agent, and the app/docs/storybook/mailpit processes — in a single tmux session (macOS).

Beyond the Quick start deps, this needs `tmux`, plus `nvim` and `claude` for the tools window (and Docker, since mailpit always runs in a container).

```sh
./tmux-setup.sh up [vite|docker]   # setup + tools + dev processes, then attach
./tmux-setup.sh open [target]      # open dev URLs in the browser (app|storybook|mailpit|docs|all)
./tmux-setup.sh stop-dev           # stop the app/docs/storybook/mailpit processes
```

Other sub-commands: `setup`, `start-dev`, `start-tools`, `attach`.

## Documentation

See [`docs/index.html`](docs/index.html) for the full map — setup (Vite and Docker), code layout, stack, auth, event sourcing, CLI, deployment, and agent notes.
