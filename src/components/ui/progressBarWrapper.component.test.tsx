import { renderWithProviders, screen } from '~src/test/render.utils';
import ProgressBarWrapper from './progressBarWrapper.component';

describe('ProgressBarWrapper', () => {
  it('exposes the given value as the accessibility value', async () => {
    await renderWithProviders(<ProgressBarWrapper value={42} />);

    expect(screen.getByRole('progressbar', { value: { now: 42 } })).toBeTruthy();
  });

  it('clamps values above 100', async () => {
    await renderWithProviders(<ProgressBarWrapper value={150} />);

    expect(screen.getByRole('progressbar', { value: { now: 100 } })).toBeTruthy();
  });

  it('clamps negative values to 0', async () => {
    await renderWithProviders(<ProgressBarWrapper value={-10} />);

    expect(screen.getByRole('progressbar', { value: { now: 0 } })).toBeTruthy();
  });
});
