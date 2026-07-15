# SabersProps – review, vulnerabilities, and improvement plan

## Executive summary

The app already has a strong domain model and a clear feature scope for a personal collection manager. The architecture is fairly tidy for a mobile app built with Expo, React Native, React Query, Zustand, and Supabase.

The main weaknesses are not about the overall concept, but about resilience and maintainability:

- some data-loading paths assume that data always exists and can fail silently or crash on empty results;
- a few stateful UI components can become stale when parent data changes;
- there is a unit/component testing layer now, but no E2E coverage yet, so full user-journey regressions (e.g. the
  create-prop flow end to end) can still slip through.

---

## P0 – urgent / high impact

### 1. Fix the missing-data assumptions in the prop detail loader

- Priority: P0
- Quick win: Yes
- Estimated time: 1–2 hours
- Evidence: the prop detail loader uses `.single()` for the main prop, prices, and accessories queries. If a row is missing, this can produce runtime failures or broken screens.
- Recommended fix:
  - replace `.single()` with `.maybeSingle()` for optional relations such as prices and accessories;
  - handle `null` values gracefully and show an empty state instead of crashing.

### 2. Add environment and configuration validation for Supabase

- Priority: P0
- Quick win: Yes
- Estimated time: 30–60 minutes
- Evidence: the app reads configuration directly from Expo config values with no guard for missing values.
- Recommended fix:
  - validate required keys before creating the Supabase client;
  - fail with a clear message in development;
  - ensure only public keys are used client-side and never service-role secrets.

---

## P1 – rendering and state-management issues

### 3. Add explicit loading, error, and empty states for list/detail screens

- Priority: P1
- Quick win: Yes
- Estimated time: 2–4 hours
- Evidence: several screens rely on loading checks or empty fallback components, but the user experience is still inconsistent when data fetches fail or return no rows.
- Recommended fix:
  - add `isError` handling in the query layers;
  - show dedicated empty/error cards for collection, notes, todos, and stats views;
  - keep the existing skeleton UI for loading.

### 4. Improve chart robustness and lifecycle handling

- Priority: P1
- Quick win: No
- Estimated time: 2–3 hours
- Evidence: the chart components initialize ECharts in `useEffect` and dispose them on cleanup, but they do not guard robustly against empty datasets or zero-sized dimensions.
- Recommended fix:
  - guard against empty data before chart initialization;
  - avoid chart recreation on every unrelated state change;
  - use a stable chart container size and provide a fallback UI when there is no data.

### 5. Reduce stale UI after mutations and invalidations

- Priority: P1
- Quick win: Yes
- Estimated time: 2–3 hours
- Evidence: mutations invalidate queries, but the UI still depends on local state and store values that may lag behind server data.
- Recommended fix:
  - use optimistic updates for simple toggles (accessories, price updates);
  - update local state from the mutation response when available;
  - keep invalidations for consistency but avoid visible flicker.

---

## P2 – medium-term architecture and quality improvements

### 6. Add automated tests

- Priority: P2
- Quick win: No
- Estimated time: 2–5 days
- Status: unit tests (helpers/stores) and component/page tests (Jest + `jest-expo` + React Native Testing Library,
  see CLAUDE.md's Testing section) are done. Remaining:
  - add a small E2E suite for the most important user journeys such as creating a prop and editing prices.

### 7. Introduce a shared API/result layer and remove duplicate data logic

- Priority: P2
- Quick win: No
- Estimated time: 3–6 hours
- Recommended fix:
  - centralize Supabase calls behind typed service functions;
  - return a consistent result shape with `data`, `error`, and `status`;
  - avoid scattering table names and query logic across screens.

### 8. Improve performance for long lists and search-heavy screens

- Priority: P2
- Quick win: Yes
- Estimated time: 2–4 hours
- Recommended fix:
  - use `estimatedItemSize` on FlashList where relevant;
  - debounce search input updates;
  - memoize derived values and expensive transforms.

### 9. Add offline awareness and better local persistence

- Priority: P2
- Quick win: No
- Estimated time: 1–2 days
- Recommended fix:
  - cache query results locally for offline viewing;
  - support conflict resolution for edits made while offline;
  - optionally sync later when the connection returns.

### 10. Add observability and crash reporting

- Priority: P2
- Quick win: No
- Estimated time: 2–4 hours
- Recommended fix:
  - integrate a crash reporter such as Sentry or Firebase Crashlytics;
  - log important API failures and user actions in a controlled way.

---

## Product improvements to consider

### 11. Add a picture gallery for prop details

- Priority: P1
- Quick win: No
- Estimated time: 3–5 days
- This is already mentioned in the README roadmap and would significantly improve the detail experience.

### 12. Add grouping, ordering, and drag-and-drop for collection display

- Priority: P1
- Quick win: No
- Estimated time: 2–4 days
- Useful for organizing props by shelf, display theme, or collection groups.

### 13. Add import/export for collection data

- Priority: P1
- Quick win: No
- Estimated time: 1–2 days
- CSV/JSON export would be valuable for backups and migration.

### 14. Add cloud sync and profile features

- Priority: P1
- Quick win: No
- Estimated time: 3–7 days
- This covers the existing roadmap items around authentication/profile management and sync.

### 15. Add richer stats and price-history views

- Priority: P2
- Quick win: Yes
- Estimated time: 2–4 hours
- Good follow-up to the current stats module: price trends, spend over time, and category summaries.

### 16. Add a full accessories inventory dashboard

- Priority: P2
- Quick win: Yes
- Estimated time: 2–4 hours
- The app already has accessories and todos; this could become a dedicated dashboard with progress bars and filters.

---

## Features already mentioned in the README that are worth keeping in the backlog

- [ ] Authentication / profile improvements
  - [ ] avatar
  - [ ] password change
  - [ ] update/delete user
  - [ ] password recovery
- [ ] Collection details
  - [ ] pictures gallery
- [ ] Disposition improvements
  - [ ] grouping
  - [ ] drag and drop
- [ ] Export / import
- [ ] Cloud sync

---

## Interesting observations to preserve

- The app already has a clear domain model and a modular folder structure, which is a good base for future growth.
- The use of React Query and Zustand is a strong technical choice for this type of app.
- The project is a good fit for experimentation with new libraries, but those experiments should remain isolated behind clear modules or feature flags to avoid complexity.
- Because the app is personal and not intended for public release, you can favor fast iteration over polished public-facing infrastructure, while still adding a few safety layers around data fetching and testing.
