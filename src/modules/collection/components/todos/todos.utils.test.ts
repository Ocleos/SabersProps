import type { TodoAccessories } from '../../types/todoAccessories.type';
import { countPending, countPendingTodos } from './todos.utils';

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
