import type { Expense } from '~src/modules/collection/types/expense.type';
import {
  calculateExpenses,
  calculateExpensesByMonths,
  calculateExpensesByYears,
  calculateExpensesGlobalByMonths,
  ExpensesTypes,
  getZoomByType,
} from './expenses.utils';

describe('getZoomByType', () => {
  it('returns 80 for days', () => {
    expect(getZoomByType(ExpensesTypes.DAYS)).toBe(80);
  });

  it('returns 50 for months', () => {
    expect(getZoomByType(ExpensesTypes.MONTHS)).toBe(50);
  });

  it('returns 0 for years and global months', () => {
    expect(getZoomByType(ExpensesTypes.YEARS)).toBe(0);
    expect(getZoomByType(ExpensesTypes.GLOBAL_MONTHS)).toBe(0);
  });
});

const expenses: Expense[] = [
  { date: '2023-03-10', fees: 5, price: 100 },
  { date: '2023-03-25', fees: 5, price: 50 },
  { date: '2023-07-01', fees: 10, price: 200 },
  { date: '2024-01-15', fees: 2, price: 30 },
];

describe('calculateExpensesByMonths', () => {
  it('sums fees and price for entries within the same month', () => {
    const result = calculateExpensesByMonths(expenses);

    expect(result).toHaveLength(3);
    const march = result.find((entry) => entry.date === '2023-03');
    expect(march).toMatchObject({ fees: 10, price: 150 });
  });
});

describe('calculateExpensesByYears', () => {
  it('sums fees and price for entries within the same year', () => {
    const result = calculateExpensesByYears(expenses);

    expect(result).toHaveLength(2);
    const year2023 = result.find((entry) => entry.date === '2023');
    expect(year2023).toMatchObject({ fees: 20, price: 350 });
    const year2024 = result.find((entry) => entry.date === '2024');
    expect(year2024).toMatchObject({ fees: 2, price: 30 });
  });
});

describe('calculateExpensesGlobalByMonths', () => {
  it('groups entries by month regardless of year and sorts by month index', () => {
    const result = calculateExpensesGlobalByMonths(expenses);

    expect(result.map((entry) => entry.date)).toEqual(['0', '2', '6']);
    const january = result.find((entry) => entry.date === '0');
    expect(january).toMatchObject({ fees: 2, price: 30 });
  });
});

describe('calculateExpenses', () => {
  it('returns days, months, years and globalMonths breakdowns', () => {
    const result = calculateExpenses(expenses);

    expect(result.days).toHaveLength(expenses.length);
    expect(result.months).toHaveLength(3);
    expect(result.years).toHaveLength(2);
    expect(result.globalMonths).toHaveLength(3);
  });
});
