import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PropDetailComponentsPage from './propDetailComponents.page';

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ navigate: mockNavigate }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
}));

const propDetail: PropDetail = {
  components: [
    {
      date: '2024-03-15',
      fees: 5,
      feesEuros: 5,
      id: 'component-1',
      idProp: 'prop-1',
      label: 'Blade',
      price: 50,
      priceEuros: 50,
      rate: 1,
      seller: 'Amazon',
    },
    {
      date: '2024-04-01',
      fees: 2,
      feesEuros: 2,
      id: 'component-2',
      idProp: 'prop-1',
      label: 'Chassis',
      price: 80,
      priceEuros: 80,
      rate: 1,
      seller: 'KRSabers',
    },
  ],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

beforeEach(() => {
  usePropDetailStore.setState(usePropDetailStore.getInitialState(), true);
  usePropDetailStore.getState().updatePropDetail(propDetail);
});

describe('PropDetailComponentsPage', () => {
  it('renders every component', async () => {
    await renderWithProviders(<PropDetailComponentsPage />);

    expect(screen.getByText('Blade')).toBeTruthy();
    expect(screen.getByText('Chassis')).toBeTruthy();
  });

  it('filters the components as the user searches', async () => {
    await renderWithProviders(<PropDetailComponentsPage />);

    fireEvent.changeText(screen.getByPlaceholderText('Rechercher'), 'Blade');

    await waitFor(() => expect(screen.queryByText('Chassis')).toBeNull());
    expect(screen.getByText('Blade')).toBeTruthy();
  });

  it('clears the selected component and navigates to the form when the FAB is pressed', async () => {
    usePropDetailStore.getState().setSelectedComponent(propDetail.components[0]);
    await renderWithProviders(<PropDetailComponentsPage />);

    // Each component card also renders an ActionsMenu trigger button — the FAB is the last button
    // in the tree.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);

    expect(usePropDetailStore.getState().selectedComponent).toBeUndefined();
    expect(mockNavigate).toHaveBeenCalledWith('/(root)/collection/prop-1/form');
  });
});
