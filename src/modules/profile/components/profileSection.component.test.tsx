import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import ProfileSection from './profileSection.component';

const mockSignOut = jest.fn();

jest.mock('expo-router', () => ({
  useIsFocused: () => true,
}));

jest.mock('~src/utils/supabase.utils', () => ({
  getUserData: jest.fn().mockResolvedValue({ displayName: 'Obi-Wan', email: 'obi-wan@jedi.order', id: 'user-1' }),
  supabase: { auth: { signOut: () => mockSignOut() } },
}));

describe('ProfileSection', () => {
  it('renders the section title', async () => {
    await renderWithProviders(<ProfileSection />);
    await flushAsync();

    expect(screen.getByText('Profil')).toBeTruthy();
  });

  it('renders the user display name and email once loaded', async () => {
    await renderWithProviders(<ProfileSection />);

    await waitFor(() => expect(screen.getByText('Obi-Wan')).toBeTruthy());
    expect(screen.getByText('obi-wan@jedi.order')).toBeTruthy();
  });

  it('signs the user out when the sign-out button is pressed', async () => {
    await renderWithProviders(<ProfileSection />);

    fireEvent.press(screen.getByText('Déconnexion'));

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
