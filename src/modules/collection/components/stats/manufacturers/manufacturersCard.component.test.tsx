import type { Prop } from '~src/modules/collection/types/prop.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import ManufacturersCard from './manufacturersCard.component';

const props: Prop[] = [
  { manufacturer: 'KRSabers', name: 'Graflex', state: 1, type: 1 },
  { manufacturer: 'Other Manufacturer', name: 'Anakin', state: 6, type: 2 },
];

const mockGetData = jest.fn().mockResolvedValue(props);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_TABLE: 'props',
}));

jest.mock('expo-router/react-navigation', () => ({
  useIsFocused: () => true,
}));

describe('ManufacturersCard', () => {
  it('renders the accordion title', async () => {
    await renderWithProviders(<ManufacturersCard />);

    await flushAsync();

    expect(screen.getByText('Créateurs')).toBeTruthy();
  });

  it('renders the manufacturers repartition once loaded', async () => {
    await renderWithProviders(<ManufacturersCard />);

    fireEvent.press(screen.getByText('Créateurs'));

    await waitFor(() => expect(screen.getByText('KRSabers')).toBeTruthy());
    expect(screen.getByText('Other Manufacturer')).toBeTruthy();
    expect(screen.getAllByText('1 (50 %)').length).toBe(2);
  });

  it('shows an error state and retries the query when the fetch fails', async () => {
    mockGetData.mockRejectedValueOnce(new Error('network error'));
    await renderWithProviders(<ManufacturersCard />);

    fireEvent.press(screen.getByText('Créateurs'));
    await waitFor(() => expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy());

    mockGetData.mockResolvedValueOnce(props);
    fireEvent.press(screen.getByText('Réessayer'));

    await waitFor(() => expect(screen.getByText('KRSabers')).toBeTruthy());
  });

  it('shows the empty state when there are no props recorded', async () => {
    mockGetData.mockResolvedValueOnce([]);
    await renderWithProviders(<ManufacturersCard />);

    fireEvent.press(screen.getByText('Créateurs'));

    await waitFor(() => expect(screen.getByText('Aucune donnée')).toBeTruthy());
  });

  it('splits combined manufacturer values on " / " into separate entries', async () => {
    mockGetData.mockResolvedValueOnce([
      { manufacturer: 'KRSabers / Other Manufacturer', name: 'Graflex', state: 1, type: 1 },
    ] satisfies Prop[]);
    await renderWithProviders(<ManufacturersCard />);

    fireEvent.press(screen.getByText('Créateurs'));

    await waitFor(() => expect(screen.getByText('KRSabers')).toBeTruthy());
    expect(screen.getByText('Other Manufacturer')).toBeTruthy();
    expect(screen.getAllByText('1 (50 %)').length).toBe(2);
  });
});
