import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import SellingPriceButton from './sellingPriceButton.component';

jest.mock('~src/utils/supabase.utils', () => ({
  PROPS_SELLING_PRICE_TABLE: 'sellingPrices',
  upsertData: jest.fn(),
}));

const prop: PropDetail = {
  components: [],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

describe('SellingPriceButton', () => {
  it('does not show the edit modal by default', async () => {
    await renderWithProviders(<SellingPriceButton prop={prop} />);

    expect(screen.queryByText('Éditer le prix de vente')).toBeNull();
  });

  it('opens the edit modal when pressed', async () => {
    await renderWithProviders(<SellingPriceButton prop={prop} />);

    fireEvent.press(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByText('Éditer le prix de vente')).toBeTruthy());
  });
});
