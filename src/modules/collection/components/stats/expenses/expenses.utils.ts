import dayjs from 'dayjs';
import type { Expense, ExpensesData } from '~src/modules/collection/types/expense.type';
import { FORMAT_DATE, formatDate } from '~src/utils/format.utils';
import { capitalize } from '~src/utils/objects.utils';

export enum ExpensesTypes {
  DAYS = 'days',
  GLOBAL_MONTHS = 'globalMonths',
  MONTHS = 'months',
  YEARS = 'years',
}

export const getZoomByType = (type: ExpensesTypes) => {
  switch (type) {
    case ExpensesTypes.DAYS:
      return 80;
    case ExpensesTypes.MONTHS:
      return 50;
    default:
      return 0;
  }
};

export const calculateExpensesByMonths = (data: Expense[]) => {
  return data.reduce((accumulator, currentValue) => {
    const month = formatDate(currentValue.date, 'YYYY-MM');
    // Check if month already exists
    const index = accumulator.findIndex((value) => value.date === month);

    if (index !== -1) {
      // Update previous value
      accumulator[index] = {
        ...accumulator[index],
        fees: accumulator[index].fees + currentValue.fees,
        price: accumulator[index].price + currentValue.price,
      };
    } else {
      // Add current value
      accumulator.push({ ...currentValue, date: month, label: capitalize(formatDate(currentValue.date, 'MMM YY')) });
    }

    return accumulator;
  }, [] as Expense[]);
};

export const calculateExpensesByYears = (data: Expense[]) => {
  return data.reduce((accumulator, currentValue) => {
    const year = dayjs(currentValue.date).year();
    // Check if year already exists
    const index = accumulator.findIndex((value) => value.date === year.toString());

    if (index !== -1) {
      // Update previous value
      accumulator[index] = {
        ...accumulator[index],
        fees: accumulator[index].fees + currentValue.fees,
        price: accumulator[index].price + currentValue.price,
      };
    } else {
      // Add current value
      accumulator.push({ ...currentValue, date: year.toString(), label: year.toString() });
    }

    return accumulator;
  }, [] as Expense[]);
};

export const calculateExpensesGlobalByMonths = (data: Expense[]) => {
  return data
    .reduce((accumulator, currentValue) => {
      const month = dayjs(currentValue.date).month();
      // Check if month already exists
      const index = accumulator.findIndex((value) => value.date === month.toString());

      if (index !== -1) {
        // Update previous value
        accumulator[index] = {
          ...accumulator[index],
          fees: accumulator[index].fees + currentValue.fees,
          price: accumulator[index].price + currentValue.price,
        };
      } else {
        // Add current value
        accumulator.push({
          ...currentValue,
          date: month.toString(),
          label: capitalize(formatDate(currentValue.date, 'MMM')),
        });
      }

      return accumulator;
    }, [] as Expense[])
    .sort((a, b) => Number(a.date) - Number(b.date));
};

export const calculateExpenses = (data: Expense[]) => {
  const expenses: ExpensesData = {
    days: data.map((expense) => ({ ...expense, label: formatDate(expense.date, FORMAT_DATE) })),
    globalMonths: calculateExpensesGlobalByMonths(data),
    months: calculateExpensesByMonths(data),
    years: calculateExpensesByYears(data),
  };

  return expenses;
};
