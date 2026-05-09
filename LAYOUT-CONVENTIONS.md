# App layout conventions

A way to organize a SvelteKit (or similar) app so each concern has a single, predictable home, and routes are thin glue.

## Principle

Each kind of code lives in exactly one place, named for what it *is*, not for the feature it serves. Routes import from these places and wire them together; routes do not contain domain logic, schemas, or storage code.

## Layout

```
src/
  lib/
    schemas/       # Zod schemas + inferred types — the single source of truth for shapes
    test_data/     # Fixtures matching the schemas, for tests, stories, and seeding
    store/         # All persistence: db client, SQL, migrations, and one repository file per entity (e.g. decisionRepository.ts)
    engine/        # Pure domain logic / business rules / reducers — no IO, no clocks, no randomness
    utils/
      config.ts    # Centralized config (env vars read here, nowhere else)
    components/    # UI components, grouped by feature subfolder
  routes/          # Thin glue: load data via store, call engine, render components
```

## What goes where

- **schemas/** — Zod schemas and the types inferred from them. Every domain shape is defined once here. Imported by store, engine, components, and test_data.
- **test_data/** — Realistic fixtures that satisfy the schemas. Used by unit tests, component stories, and local seed scripts. Never imported by production code paths.
- **store/** — Everything related to the database and persistence: connection (`db.ts`), schema/migrations, and one repository file per entity (e.g. `decisionRepository.ts`, later `userRepository.ts`). The rest of the app talks to the store through named functions on those repositories (`loadX`, `createX`, `appendY`), never raw SQL. Avoid a catch-all `index.ts` — import the specific repository.
- **engine/** — Pure functions that encode the domain rules. Deterministic: no `Date.now()`, no `Math.random()`, no IO. IDs and timestamps are passed in. Easy to test, easy to reason about.
- **utils/config.ts** — The only place that reads `process.env` / `import.meta.env`. Everything else imports typed values from here.
- **components/** — Presentational and small interactive components, grouped into feature subfolders (e.g. `components/factors/`, `components/scenarios/`). Co-locate stories and component tests next to the component. Component names lead with the entity, then role, then optional action: `<Entity><Role><Action?>` — e.g. `FactorForm`, `FactorFormEdit`, `FactorFormDelete`, `DecisionMetadataForm`. Leading with the entity keeps related files adjacent in directory listings and search.
- **routes/** — Glue. A route file loads data through `store`, transforms it via `engine`, and hands it to `components`. If a route file grows logic of its own, that logic belongs in `engine` or `store`.

## Rules of thumb

- Schemas are the contract. If a shape changes, it changes in `schemas/` first.
- The engine never imports from `store/`. The store may import schemas, but not the engine.
- Routes never import `store/db` or write SQL directly — they go through `store/index.ts`.
- Config is read once, at the edge, in `utils/config.ts`. No scattered `process.env` reads.
- Test data lives with the schemas it mirrors, not next to the tests that consume it.

## Why this works

- New code has an obvious home, so the tree stays shallow and predictable.
- Pure engine + thin routes means most logic is testable without a browser or a database.
- Swapping the storage layer or the UI framework touches one folder, not the whole app.
