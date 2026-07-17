import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import AccessoriesCard from './accessoriesCard.component';

const mockUpsertData = jest.fn().mockResolvedValue(undefined);

jest.mock('~src/utils/supabase.utils', () => ({
  ACCESSORIES_TABLE: 'accessories',
  upsertData: (...args: unknown[]) => mockUpsertData(...args),
}));

const propWithoutAccessories: PropDetail = {
  components: [],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

const propWithAccessories: PropDetail = {
  ...propWithoutAccessories,
  accessories: { bag: true, displayPlaque: false, id: 'accessory-1', keyring: false },
};

describe('AccessoriesCard', () => {
  it('renders the accessories title', async () => {
    await renderWithProviders(<AccessoriesCard prop={propWithoutAccessories} />);

    expect(screen.getByText('Accessoires')).toBeTruthy();
  });

  it('saves a new accessory value when a toggle is pressed', async () => {
    await renderWithProviders(<AccessoriesCard prop={propWithoutAccessories} />);

    // buttons[0] is the accordion's own trigger; the accessory toggles start at index 1.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[1]);

    await waitFor(() =>
      expect(mockUpsertData).toHaveBeenCalledWith('accessories', {
        bag: true,
        displayPlaque: false,
        id: 'prop-1',
        keyring: false,
      }),
    );
  });

  it('updates an existing accessory value without resetting the others', async () => {
    await renderWithProviders(<AccessoriesCard prop={propWithAccessories} />);

    // buttons[0] is the accordion's own trigger; the accessory toggles start at index 1.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[2]);

    await waitFor(() =>
      expect(mockUpsertData).toHaveBeenCalledWith('accessories', {
        bag: true,
        displayPlaque: false,
        id: 'accessory-1',
        keyring: true,
      }),
    );
  });

  it('reverts the toggle back to its previous state when the mutation fails', async () => {
    mockUpsertData.mockRejectedValueOnce(new Error('network error'));

    await renderWithProviders(<AccessoriesCard prop={propWithoutAccessories} />);

    // buttons[0] is the accordion's own trigger; the accessory toggles start at index 1.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[1]);

    await waitFor(() =>
      expect(mockUpsertData).toHaveBeenLastCalledWith('accessories', {
        bag: true,
        displayPlaque: false,
        id: 'prop-1',
        keyring: false,
      }),
    );

    // If the toggle had rolled back to unpressed, pressing it again sends `bag: true` once more;
    // if it stayed stuck on the optimistic (unrolled-back) pressed state, it would send `bag: false`.
    fireEvent.press(buttons[1]);

    await waitFor(() =>
      expect(mockUpsertData).toHaveBeenLastCalledWith('accessories', {
        bag: true,
        displayPlaque: false,
        id: 'prop-1',
        keyring: false,
      }),
    );
  });
});
