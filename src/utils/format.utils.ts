import dayjs from 'dayjs';
import i18n from '~src/i18n.config';

export const FORMAT_TIME = 'LT';
export const FORMAT_TIME_SECONDS = 'LTS';
export const FORMAT_DATE = 'L';
export const FORMAT_FULL_DATE_TIME = 'LLLL';

export const CURRENCY_EUROS = 'EUR';
export const CURRENCY_POUNDS = 'GPB';
export const CURRENCY_DOLLARS = 'USD';

export const formatDate = (value: string | number | dayjs.Dayjs | Date | null | undefined, format: string) =>
  dayjs(value).format(format);

export const formatNumber = (value: number, options?: Intl.NumberFormatOptions) =>
  Intl.NumberFormat(i18n.language, options).format(value);

export const formatToCurrency = (value: number, currency: string = CURRENCY_EUROS) =>
  formatNumber(value, { currency, style: 'currency' });

export const formatToUnit = (value: number, unit: string) =>
  formatNumber(value, { style: 'unit', unit, unitDisplay: 'short' });
