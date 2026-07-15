import { renderWithProviders, screen } from '~src/test/render.utils';
import EmptyComponent from './empty.component';

describe('EmptyComponent', () => {
  it('renders the given title', async () => {
    await renderWithProviders(<EmptyComponent title='No props yet' />);

    expect(screen.getByText('No props yet')).toBeTruthy();
  });

  it('falls back to the default translated message when no title is given', async () => {
    await renderWithProviders(<EmptyComponent />);

    expect(screen.getByText('Aucune donnée')).toBeTruthy();
  });
});
