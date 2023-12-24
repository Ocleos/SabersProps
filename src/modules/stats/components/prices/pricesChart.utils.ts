import i18n from '~src/i18n.config';
import { ChartPricesSeries } from '../../models/chartPricesSeries.model';

export const pricesChartSeries: ChartPricesSeries[] = [
  { label: i18n.t('stats:LABEL.PRICE'), property: 'price', color: 'primary', isVisible: true },
  { label: i18n.t('stats:LABEL.FEES'), property: 'fees', color: 'tertiary', isVisible: true },
  { label: i18n.t('common:COMMON.TOTAL'), property: 'total', color: 'yellow', isVisible: false },
  { label: i18n.t('stats:LABEL.PRICE_WORK'), property: 'workPrice', color: 'orange', isVisible: false },
  { label: i18n.t('stats:LABEL.PRICE_SELL'), property: 'sellingPrice', color: 'red', isVisible: false },
];
