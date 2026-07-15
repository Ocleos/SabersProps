import { renderWithProviders, screen } from '~src/test/render.utils';
import ProfilePage from './profile.page';

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
}));

// ProfileSection and SettingsSection each have their own dedicated test with their own
// supabase/i18next/color-scheme mocks — stub them here so this test only covers ProfilePage's own
// composition, not their internals again.
jest.mock('../components/profileSection.component', () => {
  const { Text } = require('react-native');
  return () => <Text>ProfileSection</Text>;
});

jest.mock('../components/settingsSection.component', () => {
  const { Text } = require('react-native');
  return () => <Text>SettingsSection</Text>;
});

describe('ProfilePage', () => {
  it('renders the profile and settings sections', async () => {
    await renderWithProviders(<ProfilePage />);

    expect(screen.getByText('ProfileSection')).toBeTruthy();
    expect(screen.getByText('SettingsSection')).toBeTruthy();
  });
});
