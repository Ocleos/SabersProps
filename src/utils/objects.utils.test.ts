import { capitalize, searchValueInObject } from './objects.utils';

describe('capitalize', () => {
  it('uppercases the first letter and lowercases the rest', () => {
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('returns an empty string for an empty input', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('searchValueInObject', () => {
  const item = { manufacturer: 'KRSabers', name: 'Graflex' };

  it('matches when the search value is found in a property, case-insensitively', () => {
    expect(searchValueInObject('graflex', item)).toBe(true);
  });

  it('matches on a partial value', () => {
    expect(searchValueInObject('kr', item)).toBe(true);
  });

  it('returns false when no property contains the search value', () => {
    expect(searchValueInObject('lightsaber', item)).toBe(false);
  });

  it('ignores properties that are null or undefined', () => {
    const itemWithNullable = { ...item, character: null };
    expect(searchValueInObject('graflex', itemWithNullable)).toBe(true);
  });
});
