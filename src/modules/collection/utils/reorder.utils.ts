export const toSequentialOrder = <T extends { order?: number | null }>(items: T[]): T[] =>
  items.map((item, index) => ({ ...item, order: index }));
