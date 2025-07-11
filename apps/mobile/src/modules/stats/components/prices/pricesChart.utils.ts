import i18n from '~src/i18n.config';
import type { ChartPricesSeries } from '~src/modules/stats/models/chartPricesSeries.model';

export const pricesChartSeries: ChartPricesSeries[] = [
  { color: 'primary', isVisible: true, label: i18n.t('stats:LABEL.PRICE'), property: 'price' },
  { color: 'blue', isVisible: true, label: i18n.t('stats:LABEL.FEES'), property: 'fees' },
  { color: 'yellow', isVisible: false, label: i18n.t('common:COMMON.TOTAL'), property: 'total' },
  { color: 'orange', isVisible: false, label: i18n.t('stats:LABEL.PRICE_WORK'), property: 'workPrice' },
  { color: 'red', isVisible: false, label: i18n.t('stats:LABEL.PRICE_SELL'), property: 'sellingPrice' },
];
