import { computeDropIndex, moveItem, type RowLayout } from './draggableFlatListWrapper.utils';

// Three uniform 100px-tall rows stacked with no gap: row 0 spans [0,100), row 1 [100,200), row 2
// [200,300).
const layouts: RowLayout[] = [
  { height: 100, y: 0 },
  { height: 100, y: 100 },
  { height: 100, y: 200 },
];

describe('computeDropIndex', () => {
  it('returns the original index when the row has not moved', () => {
    expect(computeDropIndex(0, 0, layouts)).toBe(0);
  });

  it('returns the original index when the dragged row has no measured layout yet', () => {
    expect(computeDropIndex(0, 500, [undefined, layouts[1], layouts[2]])).toBe(0);
  });

  it('moves down past one sibling once its center is crossed', () => {
    // Row 0's center (50) + a 120px drag down lands at 170, past row 1's center (150) but not
    // row 2's (250).
    expect(computeDropIndex(0, 120, layouts)).toBe(1);
  });

  it('moves down past every sibling when dragged far enough', () => {
    expect(computeDropIndex(0, 400, layouts)).toBe(2);
  });

  it('moves up past a sibling once its center is crossed', () => {
    // Row 2's center (250) - a 120px drag up lands at 130, past row 0's center (50) but not yet
    // past row 1's center (150), so it settles just above row 1.
    expect(computeDropIndex(2, -120, layouts)).toBe(1);
  });

  it('does not move when the drag stays within the row itself', () => {
    expect(computeDropIndex(1, 20, layouts)).toBe(1);
  });

  it('skips siblings that have no measured layout yet', () => {
    expect(computeDropIndex(0, 400, [layouts[0], undefined, layouts[2]])).toBe(1);
  });
});

describe('moveItem', () => {
  it('moves an item earlier in the array', () => {
    expect(moveItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
  });

  it('moves an item later in the array', () => {
    expect(moveItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
  });

  it('returns the same array unchanged when from and to indices match', () => {
    const items = ['a', 'b', 'c'];
    expect(moveItem(items, 1, 1)).toBe(items);
  });

  it('does not mutate the input array', () => {
    const items = ['a', 'b', 'c'];
    moveItem(items, 0, 2);
    expect(items).toEqual(['a', 'b', 'c']);
  });
});
