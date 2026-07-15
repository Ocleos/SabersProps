import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import LoginPage from './login.page';

const mockNavigate = jest.fn();
const mockSignInWithPassword = jest.fn().mockResolvedValue({ error: null });

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ navigate: mockNavigate }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  supabase: { auth: { signInWithPassword: (...args: unknown[]) => mockSignInWithPassword(...args) } },
}));

describe('LoginPage', () => {
  it('renders the app name', async () => {
    await renderWithProviders(<LoginPage />);

    expect(screen.getByText('SabersProps')).toBeTruthy();
  });

  it('navigates to the sign-up page when the link is pressed', async () => {
    await renderWithProviders(<LoginPage />);

    fireEvent.press(screen.getByText('Créer un nouveau compte'));

    expect(mockNavigate).toHaveBeenCalledWith('/(auth)/signup');
  });

  // Runs last: the submit flow's `setIsLoading(false)` continuation still leaks into whichever
  // test runs immediately after, even once its own `waitFor`/`flushAsync` have settled (same class
  // of RNTL 14 + react-hook-form interaction documented in CLAUDE.md's Testing section).
  it('signs in with the entered credentials', async () => {
    await renderWithProviders(<LoginPage />);

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'obi-wan@jedi.order');
    fireEvent.changeText(screen.getByPlaceholderText('Mot de passe'), 'HelloThere123!');
    await flushAsync();
    fireEvent.press(screen.getByText('Connexion'));

    await waitFor(() =>
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'obi-wan@jedi.order',
        password: 'HelloThere123!',
      }),
    );
  });
});
