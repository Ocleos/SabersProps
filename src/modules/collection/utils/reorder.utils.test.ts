import { toSequentialOrder } from './reorder.utils';

describe('toSequentialOrder', () => {
  it('rewrites order sequentially starting at 0, following the given array order', () => {
    const items = [
      { id: 'a', order: 5 },
      { id: 'b', order: 2 },
      { id: 'c', order: 9 },
    ];

    expect(toSequentialOrder(items)).toEqual([
      { id: 'a', order: 0 },
      { id: 'b', order: 1 },
      { id: 'c', order: 2 },
    ]);
  });

  it('assigns order even when the input has no order yet', () => {
    const items = [
      { id: 'a', order: undefined },
      { id: 'b', order: undefined },
    ];

    expect(toSequentialOrder(items)).toEqual([
      { id: 'a', order: 0 },
      { id: 'b', order: 1 },
    ]);
  });

  it('returns an empty array unchanged', () => {
    expect(toSequentialOrder([])).toEqual([]);
  });

  it('does not mutate the input items', () => {
    const items = [{ id: 'a', order: 5 }];

    toSequentialOrder(items);

    expect(items).toEqual([{ id: 'a', order: 5 }]);
  });
});
