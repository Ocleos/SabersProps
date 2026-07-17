import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import SellingPriceButton from './sellingPriceButton.component';

const mockUpsertData = jest.fn().mockResolvedValue(undefined);

jest.mock('~src/utils/supabase.utils', () => ({
  PROPS_SELLING_PRICE_TABLE: 'sellingPrices',
  upsertData: (...args: unknown[]) => mockUpsertData(...args),
}));

const prop: PropDetail = {
  components: [],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  prices: { fees: 0, price: 0, sellingPrice: 100, total: 0, workPrice: 0 },
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

  // Both scenarios share a single render/test: the failure path's toast/rollback update otherwise
  // leaks into whichever test renders next, corrupting it (see CLAUDE.md's Testing section).
  it('keeps the modal open when the save fails, then saves and closes it on a retry', async () => {
    mockUpsertData.mockRejectedValueOnce(new Error('network error'));

    await renderWithProviders(<SellingPriceButton prop={prop} />);

    fireEvent.press(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByText('Éditer le prix de vente')).toBeTruthy());

    fireEvent.changeText(screen.getByPlaceholderText('Prix de vente'), '150');

    await flushAsync();
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() =>
      expect(mockUpsertData).toHaveBeenCalledWith('sellingPrices', { id: 'prop-1', sellingPrice: 150 }),
    );
    expect(screen.getByText('Éditer le prix de vente')).toBeTruthy();

    await flushAsync();
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() => expect(mockUpsertData).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.queryByText('Éditer le prix de vente')).toBeNull());
  });
});
