import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import SignUpPage from './signUp.page';

const mockReplace = jest.fn();
const mockSignUp = jest.fn();

jest.mock('expo-router', () => ({
  router: { replace: (...args: unknown[]) => mockReplace(...args) },
  Stack: { Screen: () => null },
}));

jest.mock('~src/utils/supabase.utils', () => ({
  supabase: { auth: { signUp: (...args: unknown[]) => mockSignUp(...args) } },
}));

describe('SignUpPage', () => {
  it('renders the form fields', async () => {
    await renderWithProviders(<SignUpPage />);

    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText("Nom d'utilisateur")).toBeTruthy();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeTruthy();
  });

  // Both the error and success paths are exercised within a single render/test — showing a toast
  // (either variant) leaves the toast/portal system in a state that corrupts whichever *other*
  // test renders next, regardless of `flushAsync` (same class of RNTL 14 leak documented in
  // CLAUDE.md's Testing section, but tied to `useToast` here rather than react-hook-form).
  it('reports a submit error, then succeeds and navigates once sign-up goes through', async () => {
    mockSignUp.mockResolvedValueOnce({ data: null, error: { message: 'already registered' } });
    await renderWithProviders(<SignUpPage />);

    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'obi-wan@jedi.order');
    fireEvent.changeText(screen.getByPlaceholderText("Nom d'utilisateur"), 'Obi-Wan');
    fireEvent.changeText(screen.getByPlaceholderText('Mot de passe'), 'HelloThere123!');
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() => expect(mockSignUp).toHaveBeenCalledTimes(1));
    expect(mockReplace).not.toHaveBeenCalled();
    await flushAsync();

    mockSignUp.mockResolvedValueOnce({ data: { user: { id: 'user-1' } }, error: null });
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() =>
      expect(mockSignUp).toHaveBeenLastCalledWith({
        email: 'obi-wan@jedi.order',
        options: { data: { displayName: 'Obi-Wan' } },
        password: 'HelloThere123!',
      }),
    );
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/(auth)/login'));
  });
});
