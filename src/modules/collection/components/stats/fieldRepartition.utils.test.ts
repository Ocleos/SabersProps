import { calculateFieldRepartition } from './fieldRepartition.utils';

describe('calculateFieldRepartition', () => {
  it('returns an empty array for no data', () => {
    expect(calculateFieldRepartition([])).toEqual([]);
  });

  it('counts occurrences per value and computes their percentage of the total', () => {
    expect(calculateFieldRepartition(['A', 'A', 'A', 'B'])).toEqual([
      { count: 3, percentage: 75, value: 'A' },
      { count: 1, percentage: 25, value: 'B' },
    ]);
  });

  it('sorts values by count in descending order', () => {
    expect(calculateFieldRepartition(['A', 'B', 'B']).map((item) => item.value)).toEqual(['B', 'A']);
  });

  it('sorts values by value in ascending order if count are identical', () => {
    expect(calculateFieldRepartition(['A', 'C', 'C', 'B', 'B']).map((item) => item.value)).toEqual(['B', 'C', 'A']);
  });
});
