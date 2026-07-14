import { normalizeFieldValue } from './validator.utils';

describe('normalizeFieldValue', () => {
  it('replaces a comma with a dot for a decimal-pad keyboard', () => {
    expect(normalizeFieldValue('12,5', 'decimal-pad')).toBe('12.5');
  });

  it('replaces a comma with a dot for a numeric keyboard', () => {
    expect(normalizeFieldValue('12,5', 'numeric')).toBe('12.5');
  });

  it('leaves the value untouched for other keyboard types', () => {
    expect(normalizeFieldValue('hello, world', 'default')).toBe('hello, world');
  });

  it('leaves the value untouched when no keyboard type is given', () => {
    expect(normalizeFieldValue('12,5')).toBe('12,5');
  });
});
