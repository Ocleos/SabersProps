import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import PageNotFound from './pageNotFound.component';

const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

describe('PageNotFound', () => {
  it('renders the not-found message', async () => {
    await renderWithProviders(<PageNotFound />);

    expect(screen.getByText('Page inexistante')).toBeTruthy();
  });

  it('navigates home when the return button is pressed', async () => {
    await renderWithProviders(<PageNotFound />);

    fireEvent.press(screen.getByText('Retourner à la page d’accueil'));

    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
