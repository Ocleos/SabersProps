import type { Expense } from '~src/modules/collection/types/expense.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import ExpensesCard from './expensesCard.component';

const expenses: Expense[] = [{ date: '2024-03-15', fees: 5, price: 100 }];

const mockGetData = jest.fn().mockResolvedValue(expenses);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_EXPENSE_TABLE: 'propsExpenses',
}));

jest.mock('expo-router/react-navigation', () => ({
  useIsFocused: () => true,
}));

// The chart itself renders through echarts/SVG APIs that don't work meaningfully under Jest (no
// real canvas/layout engine) — it's stubbed out so this test can focus on ExpensesCard's own
// data-fetching, loading and tab-switching logic.
jest.mock('./expensesChart.component', () => () => null);

describe('ExpensesCard', () => {
  it('renders the accordion title', async () => {
    await renderWithProviders(<ExpensesCard />);
    await flushAsync();

    expect(screen.getByText('Dépenses')).toBeTruthy();
  });

  it('renders the period tabs once the data has loaded', async () => {
    await renderWithProviders(<ExpensesCard />);

    fireEvent.press(screen.getByText('Dépenses'));

    await waitFor(() => expect(screen.getByText('Annuelles')).toBeTruthy());
    expect(screen.getByText('Journalières')).toBeTruthy();
    expect(screen.getByText('Mensuelles')).toBeTruthy();
  });
});
