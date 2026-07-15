import type { Prop } from '~src/modules/collection/types/prop.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import RepartitionCard from './repartitionCard.component';

const props: Prop[] = [
  { manufacturer: 'KRSabers', name: 'Graflex', state: 1, type: 1 },
  { manufacturer: 'KRSabers', name: 'Anakin', state: 6, type: 2 },
];

const mockGetData = jest.fn().mockResolvedValue(props);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_TABLE: 'props',
}));

jest.mock('expo-router', () => ({
  useIsFocused: () => true,
}));

// The chart itself renders through echarts/SVG APIs that don't work meaningfully under Jest — it's
// stubbed out so this test can focus on RepartitionCard's own data-fetching and loading logic.
jest.mock('./repartitionChart.component', () => () => null);

describe('RepartitionCard', () => {
  it('renders the accordion title', async () => {
    await renderWithProviders(<RepartitionCard />);

    await flushAsync();

    expect(screen.getByText('Répartition')).toBeTruthy();
  });

  it('renders the repartition table and type tabs once loaded', async () => {
    await renderWithProviders(<RepartitionCard />);

    fireEvent.press(screen.getByText('Répartition'));

    await waitFor(() => expect(screen.getByText('Lightsaber')).toBeTruthy());
    expect(screen.getByText('Prop')).toBeTruthy();
    expect(screen.getByText('Costume')).toBeTruthy();
  });
});
