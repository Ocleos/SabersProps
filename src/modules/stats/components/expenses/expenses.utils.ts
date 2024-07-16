import dayjs from 'dayjs';
import { capitalize, sort } from 'radash';
import { FORMAT_DATE, formatDate } from '~src/utils/format.utils';
import type { Expense, ExpensesData } from '../../models/expense.model';

export enum ExpensesTypes {
  DAYS = 'days',
  MONTHS = 'months',
  YEARS = 'years',
  GLOBAL_MONTHS = 'globalMonths',
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
        price: accumulator[index].price + currentValue.price,
        fees: accumulator[index].fees + currentValue.fees,
      };
    } else {
      // Add current value
      accumulator.push({ ...currentValue, label: capitalize(formatDate(currentValue.date, 'MMM YY')), date: month });
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
        price: accumulator[index].price + currentValue.price,
        fees: accumulator[index].fees + currentValue.fees,
      };
    } else {
      // Add current value
      accumulator.push({ ...currentValue, label: year.toString(), date: year.toString() });
    }

    return accumulator;
  }, [] as Expense[]);
};

export const calculateExpensesGlobalByMonths = (data: Expense[]) => {
  return sort(
    data.reduce((accumulator, currentValue) => {
      const month = dayjs(currentValue.date).month();
      // Check if month already exists
      const index = accumulator.findIndex((value) => value.date === month.toString());

      if (index !== -1) {
        // Update previous value
        accumulator[index] = {
          ...accumulator[index],
          price: accumulator[index].price + currentValue.price,
          fees: accumulator[index].fees + currentValue.fees,
        };
      } else {
        // Add current value
        accumulator.push({
          ...currentValue,
          label: capitalize(formatDate(currentValue.date, 'MMM')),
          date: month.toString(),
        });
      }

      return accumulator;
    }, [] as Expense[]),
    (value) => Number(value.date),
  );
};

export const calculateExpenses = (data: Expense[]) => {
  const expenses: ExpensesData = {
    days: data.map((expense) => ({ ...expense, label: formatDate(expense.date, FORMAT_DATE) })),
    months: calculateExpensesByMonths(data),
    years: calculateExpensesByYears(data),
    globalMonths: calculateExpensesGlobalByMonths(data),
  };

  return expenses;
};
