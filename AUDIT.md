# SabersProps – review, vulnerabilities, and improvement plan

## Executive summary

The app already has a strong domain model and a clear feature scope for a personal collection manager. The architecture is fairly tidy for a mobile app built with Expo, React Native, React Query, Zustand, and Supabase.

The main weaknesses are not about the overall concept, but about resilience and maintainability:

- some data-loading paths assume that data always exists and can fail silently or crash on empty results;
- a few stateful UI components can become stale when parent data changes;
- there is a unit/component testing layer now, but no E2E coverage yet, so full user-journey regressions (e.g. the
  create-prop flow end to end) can still slip through.

---

## P2 – medium-term architecture and quality improvements

### 1. Add automated tests

- Priority: P2
- Quick win: No
- Estimated time: 2–5 days
- Status: unit tests (helpers/stores) and component/page tests (Jest + `jest-expo` + React Native Testing Library,
  see CLAUDE.md's Testing section) are done. Remaining:
  - add a small E2E suite for the most important user journeys such as creating a prop and editing prices.

### 2. Add offline awareness and better local persistence

- Priority: P2
- Quick win: No
- Estimated time: 1–2 days
- Recommended fix:
  - cache query results locally for offline viewing;
  - support conflict resolution for edits made while offline;
  - optionally sync later when the connection returns.

### 3. Add observability and crash reporting

- Priority: P2
- Quick win: No
- Estimated time: 2–4 hours
- Recommended fix:
  - integrate a crash reporter such as Sentry or Firebase Crashlytics;
  - log important API failures and user actions in a controlled way.

---

## Product improvements to consider

### 4. Add a picture gallery for prop details

- Priority: P1
- Quick win: No
- Estimated time: 3–5 days
- This is already mentioned in the README roadmap and would significantly improve the detail experience.

### 5. Add grouping, ordering, and drag-and-drop for collection display

- Priority: P1
- Quick win: No
- Estimated time: 2–4 days
- Useful for organizing props by shelf, display theme, or collection groups.

### 6. Add import/export for collection data

- Priority: P1
- Quick win: No
- Estimated time: 1–2 days
- CSV/JSON export would be valuable for backups and migration.

### 7. Add cloud sync and profile features

- Priority: P1
- Quick win: No
- Estimated time: 3–7 days
- This covers the existing roadmap items around authentication/profile management and sync.

---

## Interesting observations to preserve

- The app already has a clear domain model and a modular folder structure, which is a good base for future growth.
- The use of React Query and Zustand is a strong technical choice for this type of app.
- The project is a good fit for experimentation with new libraries, but those experiments should remain isolated behind clear modules or feature flags to avoid complexity.
- Because the app is personal and not intended for public release, you can favor fast iteration over polished public-facing infrastructure, while still adding a few safety layers around data fetching and testing.
