import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, type RenderOptions, render } from '@testing-library/react-native';
import { type HeroUINativeConfig, HeroUINativeProvider } from 'heroui-native/provider';
import type { ReactElement, ReactNode } from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { gcTime: 0, retry: false } },
  });

const heroUINativeConfig: HeroUINativeConfig = {
  devInfo: {
    stylingPrinciples: false,
  },
};

const AllProviders: React.FC<{ children: ReactNode }> = ({ children }) => (
  <HeroUINativeProvider config={heroUINativeConfig}>
    <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
  </HeroUINativeProvider>
);

export const renderWithProviders = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

// React Query's `notifyManager` batches query-result notifications through `setTimeout(fn, 0)`
// (see `defaultScheduler` in `@tanstack/query-core`), not a microtask — so a single microtask
// flush (`await act(async () => {})`) or even `setImmediate` (whose ordering relative to
// `setTimeout(0)` is unspecified in Node outside an I/O callback, which made it flaky under
// worker load) isn't reliably enough to let a query's queryFn promise resolve *and* the
// resulting state update commit. A same-delay `setTimeout` registered after the component has
// mounted always fires after that already-queued notify callback (Node timers with an equal
// delay run in registration order). Use this after rendering a component that fetches data when
// the test doesn't otherwise wait for that data to settle (e.g. via `waitFor`), so the update
// lands inside `act` instead of leaking into the next test as a "not wrapped in act" warning.
export const flushAsync = () => act(async () => await new Promise<void>((resolve) => setTimeout(resolve, 0)));

export * from '@testing-library/react-native';
