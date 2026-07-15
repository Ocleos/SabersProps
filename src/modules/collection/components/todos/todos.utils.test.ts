import type { TodoAccessories } from '../../types/todoAccessories.type';
import { TodoType } from '../../types/todoType.type';
import { computeTodosProgress, countPending, countPendingTodos } from './todos.utils';

describe('countPending', () => {
  it('counts entries where the property is falsy', () => {
    const todos: TodoAccessories[] = [{ bag: true, name: 'A' }, { bag: false, name: 'B' }, { name: 'C' }];

    expect(countPending(todos, 'bag')).toBe(2);
  });

  it('returns 0 when every entry has the property set', () => {
    const todos: TodoAccessories[] = [{ bag: true, name: 'A' }];

    expect(countPending(todos, 'bag')).toBe(0);
  });
});

describe('countPendingTodos', () => {
  it('sums pending counts across all accessory types', () => {
    const todos: TodoAccessories[] = [
      { bag: false, displayPlaque: true, keyring: true, name: 'A', prop: false },
      { bag: true, displayPlaque: false, keyring: false, name: 'B', prop: true },
    ];

    const result = countPendingTodos(todos);

    // prop: 1 pending, bag: 1 pending, keyring: 1 pending, displayPlaque: 1 pending
    expect(result).toEqual({ props: 1, total: 4 });
  });

  it('returns zeroed counts for an empty list', () => {
    expect(countPendingTodos([])).toEqual({ props: 0, total: 0 });
  });
});

describe('computeTodosProgress', () => {
  it('computes completion counts and percentages per type and overall', () => {
    const todos: TodoAccessories[] = [
      { bag: true, displayPlaque: true, keyring: true, name: 'A', prop: true },
      { bag: false, displayPlaque: false, keyring: true, name: 'B', prop: true },
    ];

    const result = computeTodosProgress(todos);

    expect(result.types).toEqual([
      { completed: 2, percentage: 100, total: 2, type: TodoType.PROP },
      { completed: 1, percentage: 50, total: 2, type: TodoType.BAG },
      { completed: 2, percentage: 100, total: 2, type: TodoType.KEYRING },
      { completed: 1, percentage: 50, total: 2, type: TodoType.DISPLAY_PLAQUE },
    ]);
    expect(result.overall).toEqual({ completed: 6, percentage: 75, total: 8 });
  });

  it('returns zeroed progress for an empty list', () => {
    const result = computeTodosProgress([]);

    expect(result.overall).toEqual({ completed: 0, percentage: 0, total: 0 });
    expect(result.types.every((type) => type.percentage === 0 && type.total === 0)).toBe(true);
  });
});
