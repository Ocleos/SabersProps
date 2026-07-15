import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PricesCard from './pricesCard.component';

const mockUpsertData = jest.fn().mockResolvedValue(undefined);

jest.mock('~src/utils/supabase.utils', () => ({
  PROPS_SELLING_PRICE_TABLE: 'sellingPrices',
  upsertData: (...args: unknown[]) => mockUpsertData(...args),
}));

const propWithPrices: PropDetail = {
  components: [],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  prices: { fees: 5, price: 100, sellingPrice: 150, total: 105, workPrice: 20 },
  state: 1,
  type: 1,
};

const propWithoutPrices: PropDetail = {
  components: [],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

describe('PricesCard', () => {
  it('renders the formatted prices', async () => {
    await renderWithProviders(<PricesCard prop={propWithPrices} />);

    expect(screen.getByText('100,00 €')).toBeTruthy();
    expect(screen.getByText('5,00 €')).toBeTruthy();
    expect(screen.getByText('105,00 €')).toBeTruthy();
    expect(screen.getByText('20,00 €')).toBeTruthy();
    expect(screen.getByText('150,00 €')).toBeTruthy();
  });

  it('renders a placeholder when a price is missing', async () => {
    await renderWithProviders(<PricesCard prop={propWithoutPrices} />);

    expect(screen.getAllByText('-').length).toBe(5);
  });

  it('opens the selling price modal and saves the new value', async () => {
    await renderWithProviders(<PricesCard prop={propWithPrices} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);

    await waitFor(() => expect(screen.getByText('Éditer le prix de vente')).toBeTruthy());

    fireEvent.changeText(screen.getByPlaceholderText('Prix de vente'), '200');
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() =>
      expect(mockUpsertData).toHaveBeenCalledWith('sellingPrices', { id: 'prop-1', sellingPrice: 200 }),
    );
  });
});
