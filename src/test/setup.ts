// Components call `useTranslation()`/`t()` assuming i18next is already initialized, which normally
// happens once via the side-effect import in `src/app/_layout.tsx`. That file is never part of a
// component test's module graph, so initialize it here instead.
import '~src/i18n.config';
import LOG from '~src/utils/logger.utils';

// Real safe-area insets only arrive via a native onInsetsChange event, which never fires under
// Jest — the library ships an official mock (fixed insets, no provider-less crash) for this.
jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

const IGNORED_MESSAGE_SUBSTRINGS = [
  // Uniwind's CSS variables are only registered by the native styling engine at app runtime, so
  // components reading theme colors (via `useThemeColor`/`getRGBColor`) always warn about missing
  // variables under Jest.
  "Uniwind - We couldn't find your variable",
  // Direct consequences of the above: unresolved theme colors fall back to a placeholder string
  // that react-native-svg/heroui-native's color parser then reject as invalid.
  'is not a valid color or brush',
  '[colorKit.RGB]',
  // @shopify/flash-list schedules a follow-up state update via a mocked requestAnimationFrame
  // that resolves outside of any `act()` scope under Jest. It doesn't affect what a test can
  // observe, so it's not worth wrapping every FlashList render in extra `act()` boilerplate.
  'ForwardRef(FlashList)',
  // Fires when a query/animation-driven state update settles after RNTL's own `afterAll` has
  // already reset `IS_REACT_ACT_ENVIRONMENT` for the suite (e.g. React Query's `gcTime: 0`
  // garbage-collecting a query, or a reanimated layout effect) — there's no test-scoped `act()`
  // to await at that point, it's pure teardown timing.
  'The current testing environment is not configured to support act(...)',
  'An update to %s inside a test was not wrapped in act(...)',
  // react-hook-form's async validation/resolver pipeline can still be settling when a submit
  // handler triggers its own state update, so React sees two overlapping act() scopes. Doesn't
  // affect what the test observes (see the `useWatch` note in CLAUDE.md's Testing section for
  // why most form tests avoid `handleSubmit` altogether; this one can't).
  'You seem to have overlapping act() calls',
];

// React's dev warnings often use printf-style placeholders (e.g. "An update to %s..."), with the
// substituted value passed as a separate argument, so every arg needs checking, not just the first.
const isIgnoredMessage = (args: unknown[]) =>
  args.some(
    (arg) => typeof arg === 'string' && IGNORED_MESSAGE_SUBSTRINGS.some((substring) => arg.includes(substring)),
  );

// This is expected noise from running outside the native runtime, not a real issue with the code
// under test. Anything not filtered out is routed through the app's own logger instead of raw
// console, matching how the rest of the codebase logs.
console.warn = (...args: unknown[]) => {
  if (!isIgnoredMessage(args)) {
    LOG.warn(...args);
  }
};

console.error = (...args: unknown[]) => {
  if (!isIgnoredMessage(args)) {
    LOG.error(...args);
  }
};
