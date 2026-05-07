# Agent notes

## Component naming

General → particular, BEM-style: `<Type><Object><Action?>`.
Examples: `FormFactorAdd`, `FormFactorEdit`, `FormDecisionMetadata`.
Action is optional (e.g. `FormDecisionMetadata` has no action; the `Add`/`Edit` wrappers do).

## Theming Flowbite components

Style Flowbite components by passing Tailwind utility classes via `class=` (using project tokens like `bg-cta`, `bg-red`, `border-c03`, `focus:ring-c01`).
Don't reach for Flowbite's `color` prop or wrap components just to retheme them.
