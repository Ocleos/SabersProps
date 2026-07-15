import { renderWithProviders, screen } from '~src/test/render.utils';
import ToolsPage from './tools.page';

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
}));

describe('ToolsPage', () => {
  it('renders the Aurebesh translator', async () => {
    await renderWithProviders(<ToolsPage />);

    expect(screen.getByText('Traducteur Aurebesh')).toBeTruthy();
  });
});
