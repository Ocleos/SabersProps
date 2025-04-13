export const notesKeys = {
  root: () => ['notes'],
};

export const propsKeys = {
  root: () => ['props'],
  detail: (id: string) => [...propsKeys.root(), 'detail', id],
  stats: () => [...propsKeys.root(), 'stats'],
  statsRepartition: () => [...propsKeys.stats(), 'repartition'],
  statsPrices: () => [...propsKeys.stats(), 'prices'],
  statsExpenses: () => [...propsKeys.stats(), 'expenses'],
  todos: () => [...propsKeys.root(), 'todos'],
};
