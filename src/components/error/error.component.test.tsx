import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import ErrorComponent from './error.component';

describe('ErrorComponent', () => {
  it('renders the given title', async () => {
    await renderWithProviders(<ErrorComponent title='Failed to load props' />);

    expect(screen.getByText('Failed to load props')).toBeTruthy();
  });

  it('falls back to the default translated message when no title is given', async () => {
    await renderWithProviders(<ErrorComponent />);

    expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy();
  });

  it('does not render a retry button when onRetry is not given', async () => {
    await renderWithProviders(<ErrorComponent />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onRetry when the retry button is pressed', async () => {
    const onRetry = jest.fn();
    await renderWithProviders(<ErrorComponent onRetry={onRetry} />);

    fireEvent.press(screen.getByText('Réessayer'));

    expect(onRetry).toHaveBeenCalled();
  });
});
