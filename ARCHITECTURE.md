# Architecture

## Data model

State is event-sourced. A `Decision` is derived by replaying an ordered log of `Action`s.

- `src/lib/schemas/` — Zod schemas + types for `Decision`, `Factor`, `Scenario`, `DecisionMetadata`.
- `src/lib/schemas/actions.ts` — discriminated union of all `Action` types (`metadata/edit`, `factor/{add,edit,delete}`, `scenario/{add,edit,delete}`, `scenarioFactorValue/set`), each versioned.

## Reducer

- `src/lib/engine/reducer.ts` — `reduce(state, action)` and `replay(actions)`. Pure: no IO, no `Date.now()`, no random. IDs and timestamps come in via payloads.
- `emptyDecision` is the initial state.

## Storage

- `src/lib/store/db.ts`, `schema.sql` — SQLite via Kysely. Tables: `decisions` (id, title) and `actions` (decision_id, seq, type, version, payload, created_at).
- `src/lib/store/index.ts`:
  - `loadDecision(id)` → reads actions ordered by `seq`, validates with `actionSchema`, runs `replay`.
  - `createDecision(...)` → inserts `decisions` row + first `metadata/edit` action in a tx.
  - `appendAction(...)` → appends next-seq action; mirrors title to `decisions.title` on `metadata/edit`; retries on PK conflict.

## Flow

UI → build `Action` → `appendAction` (persist) → on next load, `loadDecision` replays the log into current state.
