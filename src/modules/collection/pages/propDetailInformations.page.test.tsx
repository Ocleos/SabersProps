import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PropDetailInformationsPage from './propDetailInformations.page';

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useLocalSearchParams: () => ({ id: 'prop-1' }),
}));

const propDetail: PropDetail = {
  components: [],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

const mockGetPropDetail = jest.fn().mockResolvedValue(propDetail);

jest.mock('../services/props.api', () => ({
  getPropDetail: (...args: unknown[]) => mockGetPropDetail(...args),
}));

// Each card fetches/renders its own data and is already covered by its own dedicated test — stub
// them here so this test only covers the page's own loading/loaded branching and store wiring.
jest.mock('../components/propDetail/informations/statusDetail.component', () => {
  const { Text } = require('react-native');
  return () => <Text>StatusDetail</Text>;
});
jest.mock('../components/propDetail/informations/informationsCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>InformationsCard</Text>;
});
jest.mock('../components/propDetail/informations/componentCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>ComponentCard</Text>;
});
jest.mock('../components/propDetail/informations/accessoriesCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>AccessoriesCard</Text>;
});
jest.mock('../components/propDetail/informations/pricesCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>PricesCard</Text>;
});

beforeEach(() => {
  usePropDetailStore.setState(usePropDetailStore.getInitialState(), true);
});

describe('PropDetailInformationsPage', () => {
  it('fetches the prop by id, stores it and renders every card once loaded', async () => {
    await renderWithProviders(<PropDetailInformationsPage />);

    await waitFor(() => expect(screen.getByText('StatusDetail')).toBeTruthy());
    expect(mockGetPropDetail).toHaveBeenCalledWith('prop-1');
    expect(usePropDetailStore.getState().propDetail).toEqual(propDetail);
    expect(screen.getByText('InformationsCard')).toBeTruthy();
    expect(screen.getByText('ComponentCard')).toBeTruthy();
    expect(screen.getByText('AccessoriesCard')).toBeTruthy();
    expect(screen.getByText('PricesCard')).toBeTruthy();
  });
});
