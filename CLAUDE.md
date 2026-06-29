# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SabersProps is a personal (not public-release) React Native / Expo app to manage a private collection of
lightsaber and movie-prop replicas: prop details (informations, components, accessories, prices), collection-wide
stats, todos for missing accessories, freeform notes, and small utility tools (e.g. an Aurebesh translator). It also
serves as a sandbox for trying new libraries during technological watch — keep experiments isolated behind clear
modules rather than spreading across the codebase.

A detailed technical audit, known weaknesses, and a prioritized improvement backlog live in `AUDIT.md` — check it
before starting speculative refactors so effort isn't duplicated.

## Commands

- `bun install` — install dependencies (package manager is Bun, pinned via `packageManager` in package.json)
- `bun start` — start the Expo dev server
- `bun check` — TypeScript type check (`tsc --noEmit`)
- `bun biome ci .` — lint check only, no writes (what pre-commit and CI use)
- `bun lint` — lint with autofix (`biome check . --write`)
- `bun lint:unsafe` — lint with unsafe autofixes applied
- `bun format` — format only (`biome format . --write`)
- `bun build:dev` / `bun build:preview` / `bun build:prod` — EAS builds (Android; prod also auto-submits)
- `bun release` — cut a version with release-it (creates a git tag, which triggers the EAS build pipeline)

There is no automated test suite yet (tracked in `AUDIT.md` P2 #6) — verification currently means `bun check` +
`bun biome ci .`, plus manual exercising of the affected screen.

### Environment

Requires a `.env.local` with `supabaseApiKey` (public anon key only — never the service-role key). The Supabase URL
is currently hardcoded in `app.config.ts`. Config is read via `expo-constants` in `src/utils/supabase.utils.ts` with
no validation of missing values yet (see `AUDIT.md` P0 #2).

## Architecture

### Routing vs. feature code

Routing is `expo-router` file-based under `src/app/`, split into `(auth)` and `(root)` groups. `(root)` is a
`NativeTabs` layout (`src/app/(root)/_layout.tsx`) with one tab per top-level feature: `collection`, `notes`,
`tools`, `profile`. Route files under `src/app/` are intentionally thin — each one just renders a page component
from `src/modules/<feature>/pages/`. All real logic (data fetching, layout, state) lives in `src/modules/`, not in
`src/app/`. When adding a screen: create the route file in `src/app/` and the actual implementation in the matching
`src/modules/<feature>/pages/*.page.tsx`.

Auth gating happens in `src/app/index.tsx`, which listens to `supabase.auth.onAuthStateChange` and redirects between
`/(auth)/login` and `/(root)/collection`.

### Module layout

Each feature under `src/modules/<feature>/` follows the same shape (not every module has every folder):

- `pages/` — screen-level components wired into `src/app/` routes (`*.page.tsx`)
- `components/` — feature UI, usually grouped in subfolders matching a page section (e.g.
  `collection/components/stats/{expenses,prices,repartition}/`, `collection/components/todos/`)
- `stores/` — Zustand stores for local/UI state (`*.store.ts`), created with the `devtools` middleware
- `types/` — domain types, often colocated with a Yup schema for forms (`*.type.ts`)
- `services/` — hand-written Supabase query functions for cases needing joins/multiple calls beyond the generic
  CRUD helpers (e.g. `collection/services/props.api.ts`)
- `utils/` — pure helper/calculation functions (`*.utils.ts`)

### Data layer

`src/utils/supabase.utils.ts` exports the Supabase client plus table name constants (`PROPS_TABLE`,
`PROPS_ACCESSORIES_TABLE`, `NOTES_TABLE`, etc.) and generic typed CRUD helpers (`getData`, `postData`, `putData`,
`upsertData`, `deleteData`) used directly from React Query hooks in components/pages. Reach for a dedicated
`services/*.api.ts` function only when a screen needs more than a single-table select (joins, sequential queries) —
see `props.api.ts` for the pattern. Some queries still use Supabase `.single()` directly, which throws on an empty
result instead of degrading gracefully (`AUDIT.md` P0 #1) — prefer `.maybeSingle()` in new code.

Query keys are centralized as factory objects in `src/utils/queryKeys.utils.ts` (`propsKeys`, `notesKeys`,
`userKeys`), built as arrays with shared prefixes (e.g. `propsKeys.statsRepartition()` extends `propsKeys.stats()`
extends `propsKeys.root()`). Reuse the same query key + queryFn across components when they need the same
underlying data (different `select` transforms are fine and share one cache entry) instead of re-fetching.

### UI system

Styling is Tailwind via `uniwind` (Tailwind-in-React-Native), configured in `src/global.css`; component variants use
`tailwind-variants`. `heroui-native` is the base component library — prefer its primitives (`Card`, `Surface`,
`PressableFeedback`, `ListGroup`, `Chip`, `Skeleton`, `Tabs`, etc.) over hand-rolled UI. Local wrappers in
`src/components/ui/` adapt a few primitives to app conventions: `Icon` (wraps Lucide icons with `className`-driven
color/size via `withUniwind`), `Stack`/`HStack`/`VStack`, `FabButton`, `AccordionWrapper` (wraps `heroui-native`
Accordion with the app's standard trigger/title layout), `Toggle`.

Domain-specific colors/icons are centralized as lookup records keyed by enum, not scattered per component — see
`propStates` in `types/propState.type.ts` and `propTypes` in `types/propType.type.ts`, both driven by the shared
`Colors`/`ColorScheme` definitions in `src/theme/colors.theme.ts`. Reuse these records (and add to them) rather than
inlining new color/icon mappings for the same domain concepts.

Screens are wrapped in `PageLayout` (`src/components/layout/pageLayout.component.tsx`), which sets the
`Stack.Screen` title and handles the scrollable/keyboard-avoiding container — pages shouldn't reimplement that
shell.

### i18n

`i18next` + `react-i18next`, initialized in `src/i18n.config.ts`, default language `fr` with `en` fallback. Locale
strings are split per feature (`src/locales/<lang>/<feature>.locale.ts`, e.g. `collection.locale.ts`,
`common.locale.ts`) and aggregated into the `en`/`fr` namespace maps in `src/locales/<lang>/_<lang>.locale.ts`. Keys
are uppercase and grouped by section (`LABELS`, `FORM`, `ROUTING`, `STATE`, etc.) — follow that grouping and add the
same key to both `en` and `fr` files together. `dayjs` locale is switched alongside i18next in `changeLanguage()`.

### Naming conventions

File suffixes indicate role and are relied on for quick navigation: `*.page.tsx`, `*.component.tsx`, `*.type.ts`,
`*.store.ts`, `*.locale.ts`, `*.utils.ts`, `*.hooks.tsx`, `*.api.ts`. Path aliases: `~src/*` → `src/*`, `~assets/*` →
`assets/*` (see `tsconfig.json`).

### Linting/formatting

Biome (not ESLint/Prettier) enforces formatting and import sorting (`biome.json`): single quotes, semicolons,
trailing commas, 120-char lines, and Biome's `organizeImports`/`useSortedKeys` assist actions — import order and
object key order are auto-checked, so run `bun lint` before committing rather than hand-ordering imports. Husky runs
`bun biome ci .` on pre-commit and `commitlint` (`@commitlint/config-conventional`) on commit-msg — commits must
follow Conventional Commits (`type(scope): subject`, matching existing history like `feat(app): ...`,
`fix(app): ...`).
