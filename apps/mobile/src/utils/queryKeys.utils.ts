export const notesKeys = {
  root: () => ['notes'],
};

export const propsKeys = {
  detail: (id: string) => [...propsKeys.root(), 'detail', id],
  root: () => ['props'],
  stats: () => [...propsKeys.root(), 'stats'],
  statsExpenses: () => [...propsKeys.stats(), 'expenses'],
  statsPrices: () => [...propsKeys.stats(), 'prices'],
  statsRepartition: () => [...propsKeys.stats(), 'repartition'],
  todos: () => [...propsKeys.root(), 'todos'],
};
