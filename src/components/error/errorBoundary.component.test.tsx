import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import ErrorBoundary from './errorBoundary.component';

const mockReloadAsync = jest.fn().mockResolvedValue(undefined);

jest.mock('expo-updates', () => ({
  reloadAsync: () => mockReloadAsync(),
}));

describe('ErrorBoundary', () => {
  it('renders the unknown-error message', async () => {
    await renderWithProviders(<ErrorBoundary />);

    expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy();
  });

  it('reloads the app when the return button is pressed', async () => {
    await renderWithProviders(<ErrorBoundary />);

    fireEvent.press(screen.getByText('Retourner à la page d’accueil'));

    expect(mockReloadAsync).toHaveBeenCalledTimes(1);
  });
});
