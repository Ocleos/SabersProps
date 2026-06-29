export type Expense = {
  id?: string;
  label?: string;
  date: string;
  price: number;
  fees: number;
};

export type ExpensesData = {
  days: Expense[];
  months: Expense[];
  years: Expense[];
  globalMonths: Expense[];
};
