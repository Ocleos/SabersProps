import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import SettingsSection from './settingsSection.component';

const mockToggleColorScheme = jest.fn();
const mockChangeLanguage = jest.fn();

jest.mock('~src/theme/useColorScheme.hooks', () => ({
  useColorScheme: () => ({ isDarkScheme: false, toggleColorScheme: mockToggleColorScheme }),
}));

jest.mock('~src/i18n.config', () => ({
  changeLanguage: (...args: unknown[]) => mockChangeLanguage(...args),
}));

describe('SettingsSection', () => {
  it('renders the section title', async () => {
    await renderWithProviders(<SettingsSection />);

    expect(screen.getByText('Préférences')).toBeTruthy();
  });

  it('toggles the dark theme switch', async () => {
    await renderWithProviders(<SettingsSection />);

    fireEvent(screen.getByRole('switch'), 'selectedChange', true);

    expect(mockToggleColorScheme).toHaveBeenCalledTimes(1);
  });

  it('changes the language when a different option is selected', async () => {
    await renderWithProviders(<SettingsSection />);

    fireEvent.press(screen.getByText('Anglais'));

    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
  });
});
