import { renderHook, waitFor } from '@testing-library/react-native';
import { useDebounce } from './useDebounce.hooks';

describe('useDebounce', () => {
  it('returns the initial value immediately', async () => {
    const { result } = await renderHook(() => useDebounce('initial'));

    expect(result.current).toBe('initial');
  });

  it('does not update the value before the delay has elapsed', async () => {
    const { result, rerender } = await renderHook(({ value }: { value: string }) => useDebounce(value, 200), {
      initialProps: { value: 'first' },
    });

    await rerender({ value: 'second' });

    expect(result.current).toBe('first');
  });

  it('updates the value once the delay has elapsed', async () => {
    const { result, rerender } = await renderHook(({ value }: { value: string }) => useDebounce(value, 50), {
      initialProps: { value: 'first' },
    });

    await rerender({ value: 'second' });

    await waitFor(() => expect(result.current).toBe('second'));
  });

  it('coalesces rapid changes into the latest value only', async () => {
    const { result, rerender } = await renderHook(({ value }: { value: string }) => useDebounce(value, 50), {
      initialProps: { value: 'first' },
    });

    await rerender({ value: 'second' });
    await rerender({ value: 'third' });

    await waitFor(() => expect(result.current).toBe('third'));
  });
});
