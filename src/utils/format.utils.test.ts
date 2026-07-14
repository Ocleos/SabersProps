import dayjs from 'dayjs';
import { CURRENCY_DOLLARS, formatDate, formatNumber, formatToCurrency, formatToUnit } from './format.utils';

describe('formatDate', () => {
  it('formats a date string using the given format', () => {
    expect(formatDate('2024-03-15', 'DD-MM-YYYY')).toBe('15-03-2024');
  });

  it('formats a dayjs instance', () => {
    expect(formatDate(dayjs('2024-03-15'), 'YYYY')).toBe('2024');
  });
});

describe('formatNumber', () => {
  it('formats a number using the current i18n locale', () => {
    expect(formatNumber(1234.5)).toBe('1 234,5');
  });
});

describe('formatToCurrency', () => {
  it('formats a value using euros by default', () => {
    expect(formatToCurrency(10)).toBe('10,00 €');
  });

  it('formats a value using the given currency', () => {
    expect(formatToCurrency(10, CURRENCY_DOLLARS)).toBe('10,00 $US');
  });
});

describe('formatToUnit', () => {
  it('formats a value with the given unit', () => {
    expect(formatToUnit(10, 'kilometer')).toBe('10 km');
  });
});
