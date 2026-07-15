import type { PricesInfosData } from '~src/modules/collection/types/pricesInfosData.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PricesCard from './pricesCard.component';

const data: PricesInfosData[] = [
  { fees: 5, name: 'Graflex', price: 100, sellingPrice: 150, total: 105, workPrice: 20 },
];

const mockGetData = jest.fn().mockResolvedValue(data);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_PRICES_TABLE: 'propsPrices',
}));

jest.mock('expo-router/react-navigation', () => ({
  useIsFocused: () => true,
}));

// The chart itself renders through echarts/SVG APIs that don't work meaningfully under Jest — it's
// stubbed out so this test can focus on PricesCard's own data-fetching and loading logic.
jest.mock('./pricesChart.component', () => () => null);

describe('PricesCard', () => {
  it('renders the accordion title', async () => {
    await renderWithProviders(<PricesCard />);
    await flushAsync();

    expect(screen.getByText('Prix')).toBeTruthy();
  });

  it('renders the computed price infos once loaded', async () => {
    await renderWithProviders(<PricesCard />);

    fireEvent.press(screen.getByText('Prix'));

    // A single-item dataset means total, minimum, maximum and average are all 105 €.
    await waitFor(() => expect(screen.getAllByText('105,00 €').length).toBe(4));
  });
});
