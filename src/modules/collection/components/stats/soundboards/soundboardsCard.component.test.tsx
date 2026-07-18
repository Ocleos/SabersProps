import type { Prop } from '~src/modules/collection/types/prop.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import SoundboardsCard from './soundboardsCard.component';

const props: Prop[] = [
  { manufacturer: 'KRSabers', name: 'Graflex', soundboard: 'Nec Sound', state: 1, type: 1 },
  { manufacturer: 'KRSabers', name: 'Anakin', soundboard: 'Petersen Golden Harvest', state: 6, type: 1 },
];

const mockGetData = jest.fn().mockResolvedValue(props);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_TABLE: 'props',
}));

jest.mock('expo-router/react-navigation', () => ({
  useIsFocused: () => true,
}));

describe('SoundboardsCard', () => {
  it('renders the accordion title', async () => {
    await renderWithProviders(<SoundboardsCard />);

    await flushAsync();

    expect(screen.getByText('Cartes son')).toBeTruthy();
  });

  it('renders the soundboards repartition once loaded', async () => {
    await renderWithProviders(<SoundboardsCard />);

    fireEvent.press(screen.getByText('Cartes son'));

    await waitFor(() => expect(screen.getByText('Nec Sound')).toBeTruthy());
    expect(screen.getByText('Petersen Golden Harvest')).toBeTruthy();
    expect(screen.getAllByText('1 (50 %)').length).toBe(2);
  });

  it('shows an error state and retries the query when the fetch fails', async () => {
    mockGetData.mockRejectedValueOnce(new Error('network error'));
    await renderWithProviders(<SoundboardsCard />);

    fireEvent.press(screen.getByText('Cartes son'));
    await waitFor(() => expect(screen.getByText('Une erreur inconnue est survenue.')).toBeTruthy());

    mockGetData.mockResolvedValueOnce(props);
    fireEvent.press(screen.getByText('Réessayer'));

    await waitFor(() => expect(screen.getByText('Nec Sound')).toBeTruthy());
  });

  it('shows the empty state when there are no props', async () => {
    mockGetData.mockResolvedValueOnce([]);
    await renderWithProviders(<SoundboardsCard />);

    fireEvent.press(screen.getByText('Cartes son'));

    await waitFor(() => expect(screen.getByText('Aucune donnée')).toBeTruthy());
  });

  it('shows the empty state when there are no props with a soundboard recorded', async () => {
    mockGetData.mockResolvedValueOnce([
      { manufacturer: 'KRSabers', name: 'Graflex', soundboard: undefined, state: 1, type: 1 },
    ]);
    await renderWithProviders(<SoundboardsCard />);

    fireEvent.press(screen.getByText('Cartes son'));

    await waitFor(() => expect(screen.getByText('N/A')).toBeTruthy());
  });

  it('splits combined soundboard values on " / " into separate entries', async () => {
    mockGetData.mockResolvedValueOnce([
      { manufacturer: 'KRSabers', name: 'Graflex', soundboard: 'Crystal Focus X / Proffie', state: 1, type: 1 },
    ] satisfies Prop[]);
    await renderWithProviders(<SoundboardsCard />);

    fireEvent.press(screen.getByText('Cartes son'));

    await waitFor(() => expect(screen.getByText('Crystal Focus X')).toBeTruthy());
    expect(screen.getByText('Proffie')).toBeTruthy();
    expect(screen.getAllByText('1 (50 %)').length).toBe(2);
  });
});
