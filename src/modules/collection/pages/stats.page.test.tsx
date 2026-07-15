import { renderWithProviders, screen } from '~src/test/render.utils';
import StatsPage from './stats.page';

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
}));

// Each card fetches its own data and is already covered by its own dedicated test (with its own
// supabase/expo-router mocks) — stub them here so this test only covers StatsPage's composition.
jest.mock('../components/stats/repartition/repartitionCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>RepartitionCard</Text>;
});

jest.mock('../components/stats/prices/pricesCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>PricesCard</Text>;
});

jest.mock('../components/stats/expenses/expensesCard.component', () => {
  const { Text } = require('react-native');
  return () => <Text>ExpensesCard</Text>;
});

describe('StatsPage', () => {
  it('renders the repartition, prices and expenses cards', async () => {
    await renderWithProviders(<StatsPage />);

    expect(screen.getByText('RepartitionCard')).toBeTruthy();
    expect(screen.getByText('PricesCard')).toBeTruthy();
    expect(screen.getByText('ExpensesCard')).toBeTruthy();
  });
});
