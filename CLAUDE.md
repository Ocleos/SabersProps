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
- `bun run test` — run the Jest suite once (**not** `bun test` — that's Bun's own reserved native test runner
  subcommand and ignores `package.json` scripts entirely)

Verification for a change means `bun check` + `bun biome ci .` + `bun run test`, plus manual exercising of the
affected screen for anything UI-facing.

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

### Logging

`src/utils/logger.utils.ts` exports a default `LOG` instance (`react-native-logs`, `LOG.debug/info/warn/error`) —
use it instead of raw `console.*` calls anywhere in app code (Biome's `noConsole` rule flags direct `console.x(...)`
calls). Its default `consoleTransport` always writes through `console.log` regardless of severity, which matters if
you ever need to intercept/override console output (e.g. in test setup) — routing `console.warn`/`console.error`
through `LOG.warn`/`LOG.error` is safe and won't recurse.

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

### Testing

Jest (via the `jest-expo` preset) plus React Native Testing Library (RNTL) for components. Config lives in `jest.config.js`
(including a `forceExit: true`, needed because React Query's batched `notifyManager` timers and heroui-native's
toast auto-dismiss timer otherwise keep the process alive past test completion) and a custom `jest.resolver.js`
(strips react-native's `exports` field and forces non-`.native` resolution for `react-native-worklets`, so Jest
doesn't try to load real native modules). Shared test setup is `src/test/setup.ts` (`setupFilesAfterEnv`): it
initializes i18next, mocks `react-native-safe-area-context` with the library's own official mock, and filters known
environment-only noise (Uniwind CSS variables, react-native-svg color parsing, FlashList) out of `console.warn`/
`console.error`, forwarding everything else through `LOG.warn`/`LOG.error` (see Logging above) instead of raw
console.

- **Unit tests** (`*.test.ts`, colocated with the file under test) target pure logic: `utils/*.utils.ts` helpers,
  Zustand `stores/*.store.ts`, and calculation helpers under `components/**/*.utils.ts`. No providers or rendering
  needed — plain `describe`/`it`/`expect`.
- **Component tests** (`*.component.test.tsx`, colocated with the component) use RNTL. Render through
  `renderWithProviders` from `src/test/render.utils.tsx` (wraps `HeroUINativeProvider` + a test-scoped
  `QueryClientProvider`), not RNTL's bare `render` — RNTL 14's `render()` is **async** and must be awaited before
  `screen` queries are usable. `fireEvent` does not wrap calls in `act()` in this RNTL version, so prefer
  `waitFor()`-based assertions over immediate synchronous ones after an interaction that triggers state updates.
  For components under test that depend on `expo-router` (`useRouter`, `useIsFocused`, `Stack.Screen`),
  `expo-updates`, or Supabase (`~src/utils/supabase.utils`), mock only the specific named exports actually used —
  don't `jest.requireActual` the Supabase module, it pulls in AsyncStorage and crashes under Jest.
  - For form components, prefer a `useWatch({ control, name })` + `<Text testID="watched-value">` harness over
    `handleSubmit`-based submit-button flows — RHF's async validation/resolver pipeline can leak state updates
    across test boundaries when combined with RNTL 14's non-`act()`-wrapped `fireEvent`.
  - `ref.measure()` isn't implemented by RNTL's test-renderer, so any component that opens via a `measure()`
    callback (heroui-native `Menu.Trigger`, `Select.Trigger`) can't be driven into its open state under Jest —
    scope those tests down to closed-state/trigger-render assertions.
  - Chart components built on echarts/SVG canvas rendering aren't worth testing directly (no meaningful RNTL
    assertions); mock them out (`jest.mock('./xxxChart.component', () => () => null)`) in the wrapping component's
    test instead.
  - Plain decorative SVG assets (`src/assets/**/*.icon.tsx`) have no conditional logic of their own — they're
    already exercised indirectly by every component test that renders them, so they don't get a dedicated test.
- **Page tests** (`*.page.test.tsx`, colocated with the page) cover `src/modules/<feature>/pages/*.page.tsx` the
  same way as component tests, since pages own real logic (query wiring, add/edit branching against a Zustand
  store, mutation submit flows, navigation). `PageLayout`'s `title` is passed to a mocked-out `Stack.Screen` (see
  `pageLayout.component.test.tsx`), not rendered as visible text, so don't assert on it — assert on the page's
  actual content instead. When a page reads a Zustand store directly (not via props), reset it in `beforeEach` with
  `useXStore.setState(useXStore.getInitialState(), true)`. When a page composes child components that already have
  their own dedicated test (e.g. `StatsPage`'s three cards, `ProfilePage`'s two sections), stub them out with
  `jest.mock` so the page test only covers its own composition/branching, not their internals again.
  - A query-fetching, `useWatch`/`useEffect`-cascading, or `useToast`-calling interaction can leave a pending
    update that lands *after* the test ends and corrupts whichever test renders next (empty tree, "unable to find
    element") — this is a stronger version of the RHF leak above and isn't always fixed by `waitFor`. Reach for
    `flushAsync` from `render.utils.tsx` (flushes a full `setTimeout(0)` cycle inside `act`, which
    `@tanstack/react-query`'s `notifyManager` needs — a plain microtask flush isn't enough) after the interaction.
    If that still isn't enough, the reliable fix is structural: put the offending test last in its file (nothing
    to corrupt), or merge the interaction into the same test as whatever assertion depended on it settling —
    don't chase the exact framework-internal cause further than that.
- When a test needs a placeholder manufacturer name (fixtures, mocks, examples), use `KRSabers`, not
  `Ultrasabers`.

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
