import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import AurebeshTranslator from './aurebeshTranslator.component';

describe('AurebeshTranslator', () => {
  it('renders the translator title', async () => {
    await renderWithProviders(<AurebeshTranslator />);

    expect(screen.getByText('Traducteur Aurebesh')).toBeTruthy();
  });

  it('renders every letter and digit once the accordion is opened', async () => {
    await renderWithProviders(<AurebeshTranslator />);

    fireEvent.press(screen.getByText('Traducteur Aurebesh'));

    await waitFor(() => expect(screen.getAllByText('A').length).toBeGreaterThan(0));
    expect(screen.getAllByText('Z').length).toBeGreaterThan(0);
    expect(screen.getAllByText('0').length).toBeGreaterThan(0);
    expect(screen.getAllByText('9').length).toBeGreaterThan(0);
  });
});
