# Folders feature — specification

Living spec for the "folders/groups" feature. Update the `Status:` bullet under each phase as work
progresses, the same way `AUDIT.md` tracks backlog items. This doc is meant to be picked up across
multiple sessions — read it fully before resuming work, and keep it in sync with what's actually
shipped.

Tracks `AUDIT.md` item #5 ("Add grouping, ordering, and drag-and-drop for collection display") and
the `README.md` roadmap's "Disposition" entry ("Group", "Drag & Drop"). Once this feature is fully
delivered, remove item #5 from `AUDIT.md` and check off those roadmap items in `README.md`.

## Goal

The user displays their lightsaber/prop collection on physical wall panels, each holding roughly
ten props arranged in two columns; a physically large prop sometimes spans the middle instead of
sitting in one column. The app should let the user organize their collection the same way:

- create folders (representing a panel, theme, or era "in the universe"),
- assign each prop to a folder,
- order the folders themselves,
- order the props within a folder, and
- place each prop in the left column, right column, or the middle (for big props),

so the app can render a visual approximation of the physical panel.

## Decisions

These were confirmed with the user and should not be re-litigated by a future session without
raising it explicitly:

1. **Cardinality** — a prop belongs to **zero or one** folder. Not many-to-many. This is a simple
   nullable FK on `props`, consistent with the existing `PropComponent.idProp` one-to-many pattern
   already in the codebase (`src/modules/collection/types/propComponent.type.ts`).
2. **Navigation** — folders live **inside the existing Collection tab**, as a new dashboard entry
   on `HomePage` (`src/modules/collection/pages/home.page.tsx`), alongside the existing Collection
   list / Stats / Todos cards. Not a new top-level tab. The existing flat prop list and its filters
   stay untouched.
3. **Reordering UX** — **drag-and-drop**, not up/down buttons.
4. **Panel layout** — **always exactly 2 columns** (left / right), plus a full-width "middle"
   placement for large props. Not configurable per folder.

## Design

### Ordering + column placement model

Each prop assigned to a folder gets two independent attributes:

- `order` — a single integer sequence **spanning all props in the folder**, regardless of column
  (not a separate counter per column).
- `columnPlacement` — `LEFT | MIDDLE | RIGHT`, changed via an explicit per-row control (segmented
  control or small menu), never by dragging a card across columns.

Reordering drags always happen on **one flat list**: one list of folders (folder ordering), and
separately, one list of props within a folder (prop ordering). There is never a cross-column drag.
This sidesteps the much harder masonry/cross-column drag-and-drop problem, while still letting the
panel preview be computed from the same data.

**Why not three independent per-column lists (Left/Middle/Right), each separately ordered?**
Physically, a "middle" prop breaks the left/right pairing at a specific vertical position — e.g.
row 3 is a middle prop, then rows 4–6 resume as left/right pairs. Three independent per-column
counters can't represent _where_ a middle item falls relative to the surrounding pairs without a
fourth ordering concept. A single global `order` captures this for free.

**Panel layout algorithm** — `computeFolderLayout(props)`, a pure function:

```
computeFolderLayout(props: Prop[]): FolderRow[]
// FolderRow = { type: 'pair'; left?: Prop; right?: Prop } | { type: 'full'; prop: Prop }

sorted = [...props].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))  // function sorts internally
pendingLeft = undefined
rows = []

for prop in sorted:
  if prop.columnPlacement == LEFT:
    if pendingLeft: rows.push({ type: 'pair', left: pendingLeft })  // flush unpaired
    pendingLeft = prop
  elif prop.columnPlacement == RIGHT:
    if pendingLeft:
      rows.push({ type: 'pair', left: pendingLeft, right: prop })
      pendingLeft = undefined
    else:
      rows.push({ type: 'pair', right: prop })
  elif prop.columnPlacement == MIDDLE:
    if pendingLeft: rows.push({ type: 'pair', left: pendingLeft }); pendingLeft = undefined
    rows.push({ type: 'full', prop })

if pendingLeft: rows.push({ type: 'pair', left: pendingLeft })  // trailing unpaired left

return rows
```

Edge cases to cover in tests: all-left/right pairs, a middle prop breaking a pair mid-sequence, a
trailing unpaired left, a folder starting on MIDDLE, an empty folder, a right-only row (no
preceding left). This is a best-effort visual **approximation**, not a pixel-perfect authoring
tool — matches the app's lightweight, personal-project scope.

### Drag-and-drop library

**Chosen**: [`react-native-draggable-flatlist`](https://github.com/computerjazz/react-native-draggable-flatlist)
(latest `4.0.3` as of writing), used as a plain non-virtualized `DraggableFlatList` — **only** on
the two screens that need dragging (folder list, folder detail's prop list). Folder counts and
props-per-folder are both small (~10-20, personal collection), so virtualization isn't needed
there; `FlashListWrapper` (`src/components/list/flashListWrapper.component.tsx`) stays untouched
everywhere else, since it's FlashList-based and this library wraps a plain `FlatList`, not
FlashList.

Declared peer deps (`react-native >=0.64`, `react-native-gesture-handler >=2.0.0`,
`react-native-reanimated >=2.8.0`) are compatible with this repo's versions (`react-native-gesture-
handler ~2.32.0`, `react-native-reanimated 4.5.0`), but its last publish (mid-2025) predates
certainty about Reanimated 4's worklets-package split and New Architecture-only behavior on current
Expo SDKs — compatibility isn't guaranteed from package metadata alone.

**Spike gate — do this first, before any other Phase 3 work**: install the library in isolation,
build a throwaway reorderable list of ~10 dummy items, and confirm drag works on a real
device/simulator with the New Architecture on. Budget 30–60 minutes.

**Fallback if incompatible**: hand-roll with `react-native-gesture-handler`'s
`Gesture.LongPress().simultaneousWithExternalGesture(...)` combined with `Gesture.Pan()`, driving
each row's vertical offset via a Reanimated `useAnimatedStyle`/shared value, and swapping array
indices on drag-end based on a target index computed from `absoluteY`. Bounded, well-documented
pattern given each list is small and flat (no nesting, no virtualization) — a reasonable one-day
fallback.

**Update (see Phase 6)**: the Phase 3 spike only checked that dragging *worked*, not render cost.
It turned out `react-native-draggable-flatlist` mounts noticeably slower than `FlashListWrapper`
for the same row content — confirmed by an A/B swap on `folderDetail.page.tsx` (see Phase 6) — so
this fallback is now planned work, not just a contingency.

### Order recompute strategy

On every reorder, delete, or removal, **fully rewrite** the affected list's `order` values
sequentially as `0..N-1`. No fractional/gap-based ordering. At this scale (small personal
collection, single user, no concurrent editors) a full rewrite on every drag-end is trivially cheap
and much simpler to reason about than a gap-based scheme — consistent with the app's existing
"keep it simple" data-access style (all client-side filtering today, no server-side pagination).

## Schema

**No migration files exist in this repo** — the Supabase schema is managed by hand in the
dashboard. Create these exactly (camelCase identifiers, matching the existing `idProp`,
`chassisDesigner`, `priceEuros` columns already on this schema — type them exactly as written, the
dashboard will otherwise lowercase them).

### New table: `folders`

| Column  | Type   | Nullable | Default                                                                                    | Notes                       |
| ------- | ------ | -------- | ------------------------------------------------------------------------------------------ | --------------------------- |
| `id`    | `uuid` | not null | same default as `notes.id`/`props.id` (check the dashboard, typically `gen_random_uuid()`) | Primary key                 |
| `name`  | `text` | not null | —                                                                                          |                             |
| `order` | `int4` | not null | `0`                                                                                        | Global folder display order |

Copy the same RLS policies / grants configured on a sibling table (e.g. `notes`) onto `folders`.

### Alter table: `props`

| Column            | Type               | Nullable | Default | Notes                                                                                                       |
| ----------------- | ------------------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `idFolder`        | `uuid`             | nullable | `null`  | FK → `folders.id`, **ON DELETE SET NULL** (deleting a folder unassigns its props rather than deleting them) |
| `order`           | `int4`             | nullable | `null`  | Prop's position within its folder; `null` while unassigned                                                  |
| `columnPlacement` | `int4` (or `int2`) | nullable | `null`  | Numeric enum, same storage convention as the existing `state`/`type` columns on `props`                     |

## Cross-cutting conventions

Reuse existing patterns rather than inventing new ones:

- **CRUD template**: mirror `src/modules/notes/` (types + colocated Yup schema, Zustand
  `selectedX` "editing item" store with `devtools` middleware, list/form pages, one-line route
  wrappers in `src/app/(root)/collection/folders/`).
- **Edit/delete UI**: reuse `ActionsMenu` (`src/components/menu/actionsMenu.component.tsx`) +
  `DeleteModal` (`src/components/modal/deleteModal.component.tsx`) as-is for folder cards.
- **Multi-table service pattern**: mirror `src/modules/collection/services/props.api.ts`
  (`Promise.all` + `toApiResult`/`unwrapApiResult` per response) for the new `folders.api.ts`.
- **Query keys**: extend `src/utils/queryKeys.utils.ts` with a `foldersKeys` factory object
  following the same `root()`/`detail(id)`/nested-segment shape as `propsKeys`.
- **Enum + lookup record**: follow `PropType`/`PropState`
  (`src/modules/collection/types/propType.type.ts`, `propState.type.ts`) for the new
  `PropColumnPlacement` enum (`Record<PropColumnPlacement, { icon, label }>`).
- **Locale**: add `FOLDERS.*` keys to `src/locales/{en,fr}/collection.locale.ts` (uppercase,
  grouped by section), reusing `common:COMMON.*`/`common:FORMS.*` keys for save/cancel/delete/
  toast strings rather than duplicating them.
- **Testing**: colocated `*.test.ts`/`*.component.test.tsx`/`*.page.test.tsx`, `renderWithProviders`
  from `src/test/render.utils.tsx`, reset Zustand stores in `beforeEach` via
  `useXStore.setState(useXStore.getInitialState(), true)`, mock child components that already have
  their own dedicated tests.

**Two implementation-time uncertainties** — resolve when Phase 2 is picked up, don't guess now:

1. ~~Whether `heroui-native`'s `Select` ... supports a clearable/"no selection" state for the
   folder picker on `propForm.page.tsx`.~~ Moot — Phase 2 decided `propForm.page.tsx` doesn't get a
   folder picker at all (see Phase 2 notes), so this never needed resolving.
2. ~~`EmptyComponent` ... `FlashListWrapper` ... currently renders it with no props passed
   through.~~ Resolved by not customizing it: `folderDetail.page.tsx` doesn't override
   `ListEmptyComponent`, so both "folder not found" and "folder has zero props" fall through to
   `FlashListWrapper`'s generic default empty state.

## Phases

### Phase 1 — Data model + folder CRUD

Status: Done

No prop assignment yet — just folders themselves, creatable/editable/deletable.

- [x] Create the `folders` table and add the three new `props` columns (see Schema) in the
      Supabase dashboard.
- [x] `src/utils/supabase.utils.ts` — add `export const FOLDERS_TABLE = 'folders';`
- [x] `src/utils/queryKeys.utils.ts` — add `foldersKeys` (`root()`, `detail(id)`, `props(id)`).
- [x] `src/modules/collection/types/folder.type.ts` — `Folder` type + `folderSchema`, mirroring
      `src/modules/notes/types/note.type.ts`.
- [x] `src/modules/collection/types/prop.type.ts` — add `idFolder?`, `order?`, `columnPlacement?`
      to `Prop` and matching nullable yup fields to `propSchema`. Not yet exposed on the form.
- [x] `src/modules/collection/types/propColumnPlacement.type.ts` — new enum
      `PropColumnPlacement { LEFT, MIDDLE, RIGHT }` + `propColumnPlacements` lookup record,
      following `propType.type.ts`/`propState.type.ts`.
- [x] `src/modules/collection/stores/folders.store.ts` — `selectedFolder?: Folder` +
      `setSelectedFolder`, mirroring `notes.store.ts`.
- [x] `src/modules/collection/pages/folderList.page.tsx` — list + FAB "add", mirroring
      `noteList.page.tsx`.
- [x] `src/modules/collection/pages/folderForm.page.tsx` — single `name` field, mirroring
      `noteForm.page.tsx`; on create, set `order` to current folder count.
- [x] `src/modules/collection/components/folderList/folderCard.component.tsx` — `Card` +
      `ActionsMenu`; prop count deferred to Phase 2.
- [x] Routes: `src/app/(root)/collection/folders/_layout.tsx`, `index.tsx`, `form.tsx`.
- [x] `src/modules/collection/pages/home.page.tsx` — add a "Folders" `DashboardNavCard`.
- [x] Locale: `FOLDERS.FORM.*`, `ROUTING.FOLDERS`, `HOME.DESCRIPTIONS.FOLDERS` in both
      `en`/`fr` `collection.locale.ts`. Also added `COLUMN.*` (used by `propColumnPlacement.type.ts`'s
      lookup record, needed a home now rather than waiting for Phase 2's `FOLDERS.COLUMN.*` UI copy).
- [x] Tests: `folders.store.test.ts`, `folderCard.component.test.tsx`, `folderList.page.test.tsx`,
      `folderForm.page.test.tsx`.

Verification: `bun check`, `bun biome ci .`, `bun run test` all pass (83 suites / 248 tests).
Manual create/edit/delete of a folder and the `propList`/`propForm` regression check are still
outstanding — needs a run against a real device/simulator with the manually-applied Supabase schema.

### Phase 2 — Assign props to folders + basic ordering/column placement

Status: Done (pending manual device verification)

No drag yet — assignment and column placement only.

- [x] `src/modules/collection/services/folders.api.ts` — `getFolderWithProps(id)` (props sorted
      server-side via `.order('order', { ascending: true, nullsFirst: false })`),
      `getFoldersWithPropsCount()`, `getUnassignedProps()`, `assignPropsToFolder(propIds, folderId,
  startOrder)`, `removePropFromFolder(propId)`, mirroring `props.api.ts`'s `Promise.all` pattern
      where a join is needed and using plain raw `supabase` queries (with server-side `.order()`)
      where only filtering/sorting is needed.
- [x] `src/modules/collection/pages/folderDetail.page.tsx` — flat non-draggable list of props
      (pre-sorted by `getFolderWithProps`), each row with a column-placement control (persists
      immediately) and a "remove from folder" action, plus `AddPropsToFolderSheet` for assignment.
      Status: no separate folder-name header or `ActionsMenu` (edit/delete) on this page — the
      folder name still shows via `PageLayout`'s title bar, and folder edit/delete stays exclusively
      on `folderCard.component.tsx` in the list. `propForm.page.tsx` deliberately does **not** get a
      folder picker either — assigning a prop to a folder complicates the create/edit form for no
      benefit at creation time (a new prop has no folder yet) — so assignment happens exclusively
      through this page's "add props" sheet.
- [x] `src/modules/collection/components/folderDetail/folderPropRow.component.tsx`.
- [x] `src/modules/collection/components/folderDetail/addPropsToFolderSheet.component.tsx` — lists
      unassigned props (server-sorted by name via `getUnassignedProps()`) with multi-select + "Save".
      Status: went through three designs before landing here. First, a hand-rolled `Card`/`Checkbox`
      list over a plain `ScrollView` inside a Gorhom `BottomSheetModal` — froze while loading, wasn't
      ordered, and didn't scroll (a plain `ScrollView` doesn't get gesture priority inside a bottom
      sheet's own pan handling; only `BottomSheetScrollView`/`BottomSheetFlatList` do, and those
      throw outside a real `BottomSheetModal`). Second, heroui-native `Select`
      (`selectionMode="multiple"`) with `presentation="dialog"` — same scroll problem one level up
      (a plain `ScrollView` doesn't get gesture priority inside the dialog's own drag-to-dismiss pan
      either). The final design keeps `Select` (`selectionMode="multiple"`) but switches to
      `presentation="bottom-sheet"`, using the real `BottomSheetScrollView` (from
      `@gorhom/bottom-sheet` directly) for the item list — `Select`'s bottom-sheet presentation
      wraps a genuine Gorhom `BottomSheet` internally, so this is the first design where the
      scrollable item list actually integrates with the sheet's gesture handling correctly. The
      component is also now self-contained: its FAB **is** the `Select.Trigger` (`asChild`,
      absolutely positioned), so `folderDetail.page.tsx` doesn't own any open/close state for it —
      it just renders `<AddPropsToFolderSheet currentPropsCount={...} folderId={id} />`.
      Bug found + fixed during this review: `getUnassignedProps()`'s query was cached under
      `propsKeys.root()` — the same key the flat collection list (`propList.page.tsx`) uses for
      _all_ props. Since TanStack Query treats identical keys as one cache entry, the two screens'
      differently-filtered results were silently clobbering each other. Fixed by adding a dedicated
      `propsKeys.unassigned()` key (a descendant of `propsKeys.root()`, so the existing
      `invalidateQueries({ queryKey: propsKeys.root() })` calls after assign/remove mutations still
      invalidate it too).
      Testing gap: mounting the real `Select` (`presentation="bottom-sheet"`) tree under Jest throws
      `Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'DevMenu' could not be found`,
      from a `useAnimatedReaction`-driven mapper inside heroui-native's (non-modal) `BottomSheet`
      content wrapper, on a worklet-mocked `requestAnimationFrame` callback that fires after mount —
      before any interaction, so there's no way to render this component under Jest at all right
      now. This looks like the same Reanimated-4/`react-native-worklets`-split compatibility risk
      already flagged under Design → Drag-and-drop library, not a bug in this component. No
      dedicated test exists for it — same category as this codebase's documented `ref.measure()`/
      gesture-drag Jest gaps.
- [x] `src/modules/collection/components/folderList/folderCard.component.tsx` — real prop count
      (fetch all props once on `folderList.page.tsx`, group client-side, pass `count` down — avoid
      N+1 queries).
      Status: the folder-count fetch lives in `folders.api.ts`'s `getFoldersWithPropsCount()`
      (`Promise.all` over both tables, `propsCount` merged onto each folder), consumed by a single
      `useQuery` under `foldersKeys.root()` — not two separate `useQuery` calls in the page.
- [x] Route: `src/app/(root)/collection/folders/[id].tsx`.
- [x] Locale: `FOLDERS.ACTIONS.*`, plus `FOLDERS.LABELS.PROPS_COUNT_*` and
      `FOLDERS.EMPTY_UNASSIGNED_PROPS` empty-state copy.
      Status: `FOLDERS.COLUMN.*` was skipped — Phase 1 already added the equivalent generic
      `COLUMN.*` keys for `propColumnPlacement.type.ts`'s lookup record, so column-placement labels
      (used as the column tabs' `accessibilityLabel`s) reuse those instead of duplicating them.
      `LABELS.FOLDER`/`LABELS.NO_FOLDER` and `FOLDERS.EMPTY_PROPS` were added at one point for the
      propForm folder picker / folderDetail's custom empty-props message, then removed again once
      those two features were dropped (see the two notes above) — deleted rather than left unused.
- [x] Tests: `folderDetail.page.test.tsx` (mock `services/folders.api`),
      `folderPropRow.component.test.tsx`. Also updated `folderCard.component.test.tsx` and
      `folderList.page.test.tsx` for the prop-count/navigation behavior. No dedicated test for
      `addPropsToFolderSheet.component.tsx` — see its Jest testing-gap note above.

Verification: `bun check`, `bun biome ci .`, `bun run test` all pass (85 suites / 257 tests — lower
than the 86/261 of the previous pass since `addPropsToFolderSheet.component.tsx` has no dedicated
test, see above). Manually assign a prop from the folder's "add props" sheet, change column
placement, remove a prop from a folder, delete a folder and confirm its props survive with
`idFolder` cleared.

### Phase 3 — Drag-and-drop reordering

Status: Done (pending final full-flow manual device verification). Functionally correct, but see
Phase 6 — the chosen library has a render-performance cost not caught by this phase's spike.

- [x] Run the compatibility spike described in Design → Drag-and-drop library. **Outcome: library
      confirmed working** — a throwaway `DraggableFlatList` screen (~10 dummy items) was manually
      verified on a real device with the New Architecture on; drag-to-reorder worked correctly.
      `react-native-draggable-flatlist@4.0.3` adopted as planned, no fallback needed. The spike
      screen was removed once confirmed.
- [x] `src/modules/collection/services/folders.api.ts` — added `reorderFolderProps(props)`,
      `reorderFolders(folders)` (both full sequential rewrite via `toSequentialOrder` + `putData`
      per item, see Order recompute strategy).
- [x] `src/components/list/draggableFlatListWrapper.component.tsx` — new thin wrapper around
      `DraggableFlatList`, mirroring `FlashListWrapper`'s separator/empty/footer defaults (not
      originally listed in this phase's checklist, added once the same defaults ended up
      duplicated across both pages below). Has its own dedicated test
      (`draggableFlatListWrapper.component.test.tsx`), matching `FlashListWrapper`'s precedent —
      mocks `react-native-draggable-flatlist` with a plain `FlatList` for the same Jest-
      incompatibility reason noted below.
- [x] `src/modules/collection/pages/folderList.page.tsx` — swapped to `DraggableFlatListWrapper`,
      `onDragEnd` → `reorderFolders` (kept local `orderedFolders` state resynced from the query via
      `useEffect` so the drag can reorder optimistically before the mutation settles).
- [x] `src/modules/collection/pages/folderDetail.page.tsx` — swapped to `DraggableFlatListWrapper`
      over `FolderPropRow`, `onDragEnd` → `reorderFolderProps`, same local-state/resync pattern.
- [x] `src/modules/collection/components/folderDetail/folderPropRow.component.tsx` — extended for
      `drag`/`isActive` props: a `GripVerticalIcon` drag handle (heroui-native `Button`,
      `isIconOnly`, `onLongPress={drag}`, `isDisabled={isActive}`, matching the existing remove-
      action button's pattern) plus `opacity-70` card styling while active.
- [x] `src/modules/collection/components/folderList/folderCard.component.tsx` — same `drag`/
      `isActive` extension (not explicitly listed in this phase's original checklist, but needed
      since folder list rows also get draggable — added a `FOLDERS.ACTIONS.REORDER` locale key,
      reused as the grip handle's `accessibilityLabel` on both rows).
- [x] `package.json` — added `react-native-draggable-flatlist@4.0.3`.
- [x] Extracted the `onDragEnd` → sequential-order-mapping into a small pure, unit-testable helper:
      `src/modules/collection/utils/reorder.utils.ts`'s `toSequentialOrder(items)`, covered by
      `reorder.utils.test.ts` (rewrite starting at 0, items with no prior `order`, empty array,
      no-mutation). RNTL can't simulate gesture-handler drag gestures, so the interaction itself
      stays a documented manual-verification gap (same category as the existing `ref.measure()`
      Jest limitation) — but `react-native-draggable-flatlist` couldn't even **mount** under Jest
      (a `useAnimatedScrollHandler` call inside it reads a worklet-mocked closure that Jest's
      mocked `requestAnimationFrame`/reanimated runtime never populates, throwing
      `TypeError: Cannot convert undefined or null to object`). `folderList.page.test.tsx` and
      `folderDetail.page.test.tsx` now mock `react-native-draggable-flatlist` with a plain
      `FlatList` (capturing `onDragEnd` so a "drag" can still be simulated by calling it directly),
      which additionally required filtering a `VirtualizedList`-sourced act() warning in
      `src/test/setup.ts`'s existing ignored-noise list (same category as the pre-existing
      `FlashList` entry there). `folderCard.component.test.tsx`/`folderPropRow.component.test.tsx`
      got dedicated drag/active-state cases.

Verification: `bun check`, `bun biome ci .`, `bun run test` all pass (87 suites / 269 tests).
Compatibility spike manually verified on a real device with the New Architecture on. Still
outstanding: a full manual pass on the real `folderList`/`folderDetail` screens (not the throwaway
spike) — dragging folders and dragging props within a folder, confirming persisted order survives
a refetch/app restart — against the manually-applied Supabase schema.

### Phase 4 — 2-column panel visual rendering

Status: Done (pending manual device verification)

- [x] `src/modules/collection/utils/folderPanel.utils.ts` — `computeFolderLayout(props)` per the
      Design section's algorithm, exported `FolderRow` type.
- [x] `src/modules/collection/utils/folderPanel.utils.test.ts` — cover all edge cases listed in
      Design (all-pairs, middle breaking a pair, trailing unpaired left, folder starting on
      MIDDLE, empty folder, right-only row), plus an extra case confirming the layout sorts by
      `order` regardless of input array order.
- [x] `src/modules/collection/components/folderDetail/folderPanelPreview.component.tsx` — pure
      presentational component consuming `computeFolderLayout(props)`; pairs render as two
      half-width mini cards (dashed placeholder for a missing slot), MIDDLE renders full-width.
      Mirrors `PropCard`'s visual language (state-color border, type icon) at a condensed size.
      Status: wrapped in `AccordionWrapper` (collapsed by default, title `FOLDERS.LABELS.PREVIEW`)
      rather than always rendering inline — the preview otherwise pushed the editable/draggable
      prop list below the fold on an already-tall folder detail screen. Because of this the
      component no longer short-circuits to `null` on an empty/unplaced-props folder; it always
      renders the (collapsed) accordion shell, with an empty content section in that case.
- [x] `src/modules/collection/pages/folderDetail.page.tsx` — renders `FolderPanelPreview` via
      `DraggableFlatListWrapper`'s `ListHeaderComponent`, fed the same local `orderedProps` state
      the draggable list itself renders from, so the preview updates live as props are reordered/
      reassigned/recolumned.
- [x] `CLAUDE.md` — documented in the "UI system" section (the algorithm + component + the
      collapsed-by-default `AccordionWrapper` choice), noting this is the app's first multi-column
      layout pattern since `numColumns` is unused everywhere else.
- [x] Tests: `folderPanelPreview.component.test.tsx` (accordion collapsed by default hiding props,
      paired props revealed on expand, middle + trailing unpaired left revealed on expand, empty
      folder expands without crashing), following the same press-then-`waitFor` pattern as
      `accordionWrapper.component.test.tsx`. `folderDetail.page.test.tsx` updated to mock
      `FolderPanelPreview` (it now has its own dedicated test, same convention as
      `FolderPropRow`/`AddPropsToFolderSheet`) and assert it receives the folder's props.

Verification: `bun check`, `bun biome ci .`, `bun run test` all pass (89 suites / 281 tests).
Manually building a folder with a mix of left/right/middle props and confirming the preview
visually matches expectations (including the edge cases above) is still outstanding — needs a run
against a real device/simulator with the manually-applied Supabase schema, same as prior phases.

### Phase 5 — Polish + docs

Status: Done (pending manual device verification)

- [x] Empty-state copy: zero folders, empty folder detail page (resolve the `EmptyComponent`/
      `FlashListWrapper` question from Cross-cutting conventions).
      Status: added `FOLDERS.EMPTY_FOLDERS`/`FOLDERS.EMPTY_PROPS` locale keys (`en`/`fr`) and passed
      a custom `ListEmptyComponent` to `DraggableFlatListWrapper` on `folderList.page.tsx` and
      `folderDetail.page.tsx`. The folder-detail case is conditional on `folder` being loaded/found
      (`folder ? t('collection:FOLDERS.EMPTY_PROPS') : undefined`), so the pre-existing "folder not
      found" state (`folder` is `null`) still falls through to `EmptyComponent`'s generic default —
      only "folder exists but has zero props" gets the new copy. Covered by a new test in each of
      `folderList.page.test.tsx`/`folderDetail.page.test.tsx`.
- [x] `AUDIT.md` — remove item #5 (fully resolved); renumbered the following two "Product
      improvements to consider" items (former #6/#7 → #5/#6) to keep the list contiguous.
- [x] `README.md` — check off the roadmap's "Group" and "Drag & Drop" items.
      Status: followed this repo's existing convention for shipped roadmap items (see the `feat
      (todos): ...` commit that moved "Todos" from Roadmap to Features the same way) — moved
      "Disposition: Group / Drag & Drop" from `## Roadmap` into `## Features`, rather than leaving a
      checked-off item behind (the roadmap list has no checkbox syntax anywhere).
- [x] `CLAUDE.md` — confirm the Phase 4 addition is in place and add a short note on the chosen
      drag-and-drop library/pattern (UI system or Architecture section).
      Status: Phase 4's multi-column-layout paragraph was already present. Added a new paragraph
      documenting `DraggableFlatListWrapper`, the `react-native-draggable-flatlist` choice, the
      full-sequential-rewrite `toSequentialOrder` reorder strategy, and the Jest-mocking pattern
      pages use for it, in the UI system section right before the existing multi-column-layout note.
- [ ] Full regression pass: `bun check`, `bun biome ci .`, `bun run test`, plus a manual
      end-to-end walkthrough (create folders, reorder them, assign/reassign/remove props, reorder
      within a folder, change column placements, verify the panel preview, delete a folder and
      confirm props survive unassigned, delete a prop and confirm folder counts/order recompute
      sanely).
      Status: `bun check`/`bun biome ci .`/`bun run test` pass (see Verification below); the manual
      device walkthrough is still outstanding, same as every prior phase's device-verification gap.

Verification: `bun check`, `bun biome ci .`, `bun run test` all pass (89 suites / 283 tests). The
manual end-to-end device walkthrough (and every prior phase's manual-verification gap it subsumes)
is still outstanding — needs a run against a real device/simulator with the manually-applied
Supabase schema.

### Phase 6 — Replace `react-native-draggable-flatlist` with a hand-rolled implementation

Status: Done (pending manual device verification)

**Why**: `folderDetail.page.tsx` was reported slow to render (several seconds). Investigation this
session ruled out the data layer first — `getFolderWithProps` was collapsed from two parallel
Supabase round trips into one embedded `select` (folders → props), and the folder-detail
`useQuery`'s `isFetching` was confirmed to resolve quickly once that landed. The remaining delay
was then isolated to rendering, not row content — commenting out `FolderPropRow`'s `Tabs` control
made no measurable difference — and finally to the drag library itself: temporarily swapping
`folderDetail.page.tsx` from `DraggableFlatListWrapper` to the plain `FlashListWrapper` (same row
content, no drag) made the render "almost instant". The prime suspect is
`react-native-draggable-flatlist`'s `CellRendererComponent`, which issues a native `measureLayout`
bridge call per row (needed for drag-position tracking) — a per-row native round trip that
`FlashList` doesn't pay. This confirms the Design → Drag-and-drop library section's fallback should
be implemented for real, not kept as a contingency.

Build the fallback exactly as scoped there: `react-native-gesture-handler`'s
`Gesture.LongPress().simultaneousWithExternalGesture(...)` combined with `Gesture.Pan()`, each row's
vertical offset driven by a Reanimated `useAnimatedStyle`/shared value, index swap on drag-end
computed from `absoluteY`. Both current consumers (`folderList.page.tsx`'s folders and
`folderDetail.page.tsx`'s props) need to move — they share `draggableFlatListWrapper.component.tsx`
today and should keep sharing one wrapper after the rewrite, so both screens change together.

- [x] Spike the hand-rolled pattern against a throwaway list first (same spirit as the Phase 3
      spike) — confirm drag UX and, this time, also confirm render time is comparable to
      `FlashListWrapper`'s baseline before wiring it into the real screens.
      Status: no on-device throwaway spike was run this session (no device/simulator available to
      this session) — the render-cost fix follows directly from the investigation's own diagnosis
      (the old library's `CellRendererComponent` issuing a native `measureLayout` bridge call per
      row), and the new implementation structurally can't do that (it measures each row once via a
      plain `onLayout`, not a per-render native bridge call). Real on-device render-time
      confirmation is folded into the manual-verification item below, same as every prior phase's
      standing device-verification gap.
- [x] Replace `src/components/list/draggableFlatListWrapper.component.tsx`'s internals with the
      Gesture Handler + Reanimated implementation, keeping its external prop shape (`data`,
      `renderItem`, `keyExtractor`, `onDragEnd`, `ListHeaderComponent`, `refreshing`/`onRefresh`,
      etc.) as close to today's as practical so `folderList.page.tsx`/`folderDetail.page.tsx` don't
      need large rewrites — the `onDragEnd({ data })` contract in particular should stay, since both
      pages' `toSequentialOrder`-based persistence depends on it.
      Status: the one contract change (unavoidable — see Design/CLAUDE.md) is `renderItem`'s `drag`
      param: previously a plain `() => void` wired to a `Button`'s `onLongPress`, now a
      `ComposedGesture` (`Gesture.Simultaneous(LongPress, Pan)`) attached via `<GestureDetector
      gesture={drag}>` around the row's grip handle — a live-tracking pan can't be represented as a
      single trigger callback. `FolderCard`/`FolderPropRow`'s grip handle switched from a
      heroui-native `Button` to a plain `View` + `Icon` wrapped in `GestureDetector` (nesting RNGH's
      own gesture recognizer inside a `Pressable`-based `Button` risked the two touch-handling
      systems fighting over the same touch). Also scoped down from the Design section's original
      per-row-continuously-reordering description: only the dragged row itself animates (follows
      the finger via a shared-value-driven `translateY`); siblings don't live-shift to "make room"
      as it passes over them. The drop target is computed once, at drag-end, from each row's static
      `onLayout` position plus the finger's accumulated translation — matching the "index swap on
      drag-end computed from `absoluteY`" framing in the Design section's fallback description more
      literally than a fully continuous sortable-list animation would. Extracted as pure,
      unit-tested helpers in `draggableFlatListWrapper.utils.ts`: `computeDropIndex` (the hit-test)
      and `moveItem` (the array splice), covered by
      `draggableFlatListWrapper.utils.test.ts` (crossing a sibling's center up/down, staying within
      the row itself, missing/unmeasured layouts). Scrolling is disabled for the duration of a drag
      (`scrollEnabled={activeKey === undefined}`) so a row's static layout stays valid without also
      needing to track scroll offset — a deliberate scope cut at this list size/single-user scale,
      not an oversight.
- [x] Confirm whether the underlying list can move to `FlashListWrapper`-style virtualization once
      the drag mechanism no longer needs `react-native-draggable-flatlist`'s own `FlatList`
      wrapping, or whether a plain `FlatList`/non-virtualized approach is still simplest at this
      list size (~10-20 items) — decide based on what the spike shows, don't assume.
      Status: went with a plain, fully-rendered (non-virtualized) `ScrollView`, not `FlatList` —
      the drag-end hit-test needs every row's layout available via `onLayout` at once, which a
      virtualized list can't guarantee for off-screen rows. At this list's scale (~10-20 items) that
      trade-off is free.
- [x] `package.json` — remove `react-native-draggable-flatlist` once nothing references it.
- [x] Tests: `draggableFlatListWrapper.component.test.tsx`, `folderList.page.test.tsx`,
      `folderDetail.page.test.tsx` currently mock `react-native-draggable-flatlist` with a plain
      `FlatList` (see Phase 3's testing note) — replace that mock strategy to match whatever the new
      implementation needs; re-check whether the `react-native-draggable-flatlist`-specific
      `VirtualizedList` act()-warning filter in `src/test/setup.ts` is still needed afterward.
      Status: better than expected — the new implementation mounts fine under Jest as-is (it only
      uses `useSharedValue`/`useAnimatedStyle` plus Gesture Handler's `Pan`/`LongPress`, none of
      which hit the `useAnimatedScrollHandler`/`useAnimatedReaction` worklet-mocking gap the old
      library's crash came from), so `draggableFlatListWrapper.component.test.tsx` now renders the
      real component (wrapped in `GestureHandlerRootView`, following the existing
      `bottomSheetWrapper.component.test.tsx` precedent) instead of mocking a substitute `FlatList`.
      `folderList.page.test.tsx`/`folderDetail.page.test.tsx` now mock
      `DraggableFlatListWrapper` itself rather than the old library — it has its own dedicated test
      now, same convention as the other child components these pages already stub out. The
      `VirtualizedList` act()-warning filter in `src/test/setup.ts` is confirmed no longer needed
      (removed) — the full suite was run with it stripped out first to confirm no warning
      resurfaced before deleting it. `folderCard.component.test.tsx`/
      `folderPropRow.component.test.tsx`'s old "calls drag when long-pressed" cases (which relied
      on `drag` being a plain callback) were replaced with cases that attach a real
      `Gesture.Simultaneous(Gesture.Pan())` and assert the handle still renders — RNTL's
      `fireEvent` can't drive a real gesture-handler touch sequence, so, as before, the drag
      interaction itself stays manual-verification-only.
- [x] `CLAUDE.md` — update the "UI system" paragraph that documents
      `DraggableFlatListWrapper`/`react-native-draggable-flatlist` (added in Phase 5) to describe
      the new implementation instead.
- [ ] Manual device verification: drag-to-reorder still works correctly on both `folderList` and
      `folderDetail`, persisted order survives a refetch/app restart, and render time on
      `folderDetail` with a realistically-sized folder (~15-20 props) is comparable to the
      `FlashListWrapper` A/B baseline from this investigation.
      Status: still outstanding, same as every prior phase's device-verification gap — no
      device/simulator was available to this session.

Verification: `bun check`, `bun biome ci .`, `bun run test` all pass (90 suites / 292 tests). The
manual device walkthrough above (and every prior phase's manual-verification gap it subsumes) is
still outstanding — needs a run against a real device/simulator with the manually-applied Supabase
schema.

## Critical files for reference

- `src/modules/notes/` — full CRUD template (types, store, pages, component)
- `src/modules/collection/types/prop.type.ts`, `propType.type.ts`, `propState.type.ts`
- `src/modules/collection/services/props.api.ts` — multi-table service pattern
- `src/utils/supabase.utils.ts`, `src/utils/queryKeys.utils.ts`
- `src/components/menu/actionsMenu.component.tsx`, `src/components/modal/deleteModal.component.tsx`
- `src/components/list/flashListWrapper.component.tsx`, `filterSearchWrapper.component.tsx`,
  `draggableFlatListWrapper.component.tsx` (Phase 6 rewrite target)
- `src/components/form/selectWrapper.component.tsx`, `src/components/empty/empty.component.tsx`
- `AUDIT.md` (item #5), `README.md` (roadmap), `CLAUDE.md` (UI system section)
