# SabersProps – review, vulnerabilities, and improvement plan

## Executive summary

The app already has a strong domain model and a clear feature scope for a personal collection manager. The architecture is fairly tidy for a mobile app built with Expo, React Native, React Query, Zustand, and Supabase.

The main weaknesses are not about the overall concept, but about resilience and maintainability:

- some data-loading paths assume that data always exists and can fail silently or crash on empty results;
- a few stateful UI components can become stale when parent data changes;
- there is a unit/component testing layer now, but no E2E coverage yet, so full user-journey regressions (e.g. the
  create-prop flow end to end) can still slip through.

---

## P1 – rendering and state-management issues

### 4. Reduce stale UI after mutations and invalidations

- Priority: P1
- Quick win: Yes
- Estimated time: 2–3 hours
- Status: Partially done — fixed a concrete instance where `Toggle` (`src/components/ui/toggle.component.tsx`)
  seeded its internal `isOn` state from the `isPressed` prop via `useState` but never resynced, so
  `AccessoriesCard`'s toggles could render stale (all-unchecked) on first load once the prop detail cards started
  mounting before their data arrived. `Toggle` now re-syncs `isOn` via a `useEffect` on `isPressed` changes. This
  `useState(propValue)`-without-resync shape is worth checking for in other stateful leaf components going
  forward. Optimistic updates for mutations and updating local state from mutation responses are still open.
- Evidence: mutations invalidate queries, but the UI still depends on local state and store values that may lag behind server data.
- Recommended fix:
  - use optimistic updates for simple toggles (accessories, price updates);
  - update local state from the mutation response when available;
  - keep invalidations for consistency but avoid visible flicker.

---

## P2 – medium-term architecture and quality improvements

### 5. Add automated tests

- Priority: P2
- Quick win: No
- Estimated time: 2–5 days
- Status: unit tests (helpers/stores) and component/page tests (Jest + `jest-expo` + React Native Testing Library,
  see CLAUDE.md's Testing section) are done. Remaining:
  - add a small E2E suite for the most important user journeys such as creating a prop and editing prices.

### 7. Improve performance for long lists and search-heavy screens

- Priority: P2
- Quick win: Yes
- Estimated time: 2–4 hours
- Recommended fix:
  - use `estimatedItemSize` on FlashList where relevant;
  - debounce search input updates;
  - memoize derived values and expensive transforms.

### 8. Add offline awareness and better local persistence

- Priority: P2
- Quick win: No
- Estimated time: 1–2 days
- Recommended fix:
  - cache query results locally for offline viewing;
  - support conflict resolution for edits made while offline;
  - optionally sync later when the connection returns.

### 9. Add observability and crash reporting

- Priority: P2
- Quick win: No
- Estimated time: 2–4 hours
- Recommended fix:
  - integrate a crash reporter such as Sentry or Firebase Crashlytics;
  - log important API failures and user actions in a controlled way.

---

## Product improvements to consider

### 10. Add a picture gallery for prop details

- Priority: P1
- Quick win: No
- Estimated time: 3–5 days
- This is already mentioned in the README roadmap and would significantly improve the detail experience.

### 11. Add grouping, ordering, and drag-and-drop for collection display

- Priority: P1
- Quick win: No
- Estimated time: 2–4 days
- Useful for organizing props by shelf, display theme, or collection groups.

### 12. Add import/export for collection data

- Priority: P1
- Quick win: No
- Estimated time: 1–2 days
- CSV/JSON export would be valuable for backups and migration.

### 13. Add cloud sync and profile features

- Priority: P1
- Quick win: No
- Estimated time: 3–7 days
- This covers the existing roadmap items around authentication/profile management and sync.

### 14. Add richer stats and price-history views

- Priority: P2
- Quick win: Yes
- Estimated time: 2–4 hours
- Good follow-up to the current stats module: price trends, spend over time, and category summaries.

---

## Interesting observations to preserve

- The app already has a clear domain model and a modular folder structure, which is a good base for future growth.
- The use of React Query and Zustand is a strong technical choice for this type of app.
- The project is a good fit for experimentation with new libraries, but those experiments should remain isolated behind clear modules or feature flags to avoid complexity.
- Because the app is personal and not intended for public release, you can favor fast iteration over polished public-facing infrastructure, while still adding a few safety layers around data fetching and testing.
