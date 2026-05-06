# wsid-svelte

A SvelteKit + TypeScript implementation of WSID. 
Tailwind v4, Storybook, Vitest, Zod.

## Run

```
pnpm dev          # SvelteKit dev server
pnpm storybook    # Storybook on :6006
pnpm test         # Vitest (browser + node projects)
pnpm check        # svelte-check / TS
```

## Layout

- `src/lib/components/TestBox.{svelte,schema.ts,stories.svelte,svelte.spec.ts}` — example component, Zod schema, single-meta Storybook story, browser-mode component test.
- `src/routes/layout.css` — Tailwind entry + Solarized `@theme` tokens + body styling. Single source of truth for theming, imported by both `+layout.svelte` and `.storybook/preview.ts`.
- `src/app.html` — SvelteKit shell. Body styles live in layout.css.
- `.storybook/{main,preview}.ts` — Storybook config. `preview.ts` imports `layout.css` so Tailwind + theme apply inside stories.
- `vite.config.ts` — vitest projects (`*.svelte.spec.ts` runs in browser, plain `*.spec.ts` runs in Node).

## Notes

- **Zod**: props validated at render via `safeParse`; component renders an inline error alert on failure. See `TestBox.svelte`.
- **Theme**: Tailwind v4 `@theme` tokens auto-generate utilities (`bg-ground`, `bg-red`, `text-body`). Dark mode via `prefers-color-scheme` rewrites tokens on `:root`.
- **Tests**: component tests use `vitest-browser-svelte` + Playwright Chromium. Storybook addon-vitest auto-runs stories as tests too.
- **Storybook**: Tool to preview and test components dynamically. Set up with the Tailwind theme.

