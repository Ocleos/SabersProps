import type { TodoAccessories } from '~src/modules/collection/types/todoAccessories.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import TodosPage from './todos.page';

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useIsFocused: () => true,
}));

const data: TodoAccessories[] = [
  { bag: true, id: 'prop-1', name: 'Graflex' },
  { bag: false, id: 'prop-2', name: 'Anakin' },
];

const mockGetData = jest.fn().mockResolvedValue(data);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_ACCESSORIES_TABLE: 'propsAccessories',
}));

describe('TodosPage', () => {
  it('renders every todo category once loaded', async () => {
    await renderWithProviders(<TodosPage />);
    await flushAsync();

    expect(screen.getByText('Pochette (1)')).toBeTruthy();
    expect(screen.getByText('Prop (2)')).toBeTruthy();
  });

  it('lists the pending items once a category is opened', async () => {
    await renderWithProviders(<TodosPage />);

    await waitFor(() => expect(screen.getByText('Pochette (1)')).toBeTruthy());
    fireEvent.press(screen.getByText('Pochette (1)'));

    await waitFor(() => expect(screen.getByText('Anakin')).toBeTruthy());
  });

  it('shows an error state and retries the query when the fetch fails', async () => {
    mockGetData.mockRejectedValueOnce(new Error('network error'));
    await renderWithProviders(<TodosPage />);

    await waitFor(() => expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy());

    mockGetData.mockResolvedValueOnce(data);
    fireEvent.press(screen.getByText('Réessayer'));

    await waitFor(() => expect(screen.getByText('Pochette (1)')).toBeTruthy());
  });

  it('shows the empty state when there are no accessories to track', async () => {
    mockGetData.mockResolvedValueOnce([]);
    await renderWithProviders(<TodosPage />);

    await waitFor(() => expect(screen.getByText('Aucune donnée')).toBeTruthy());
  });
});
