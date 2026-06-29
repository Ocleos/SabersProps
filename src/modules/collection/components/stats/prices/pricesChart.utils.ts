import i18n from '~src/i18n.config';
import type { ChartPricesSeries } from '~src/modules/collection/types/chartPricesSeries.type';
import { Colors, colors } from '~src/theme/colors.theme';

export const pricesChartSeries: ChartPricesSeries[] = [
  { color: colors[Colors.PRIMARY], isVisible: true, label: i18n.t('collection:STATS.LABELS.PRICE'), property: 'price' },
  { color: colors[Colors.BLUE], isVisible: true, label: i18n.t('collection:STATS.LABELS.FEES'), property: 'fees' },
  { color: colors[Colors.YELLOW], isVisible: false, label: i18n.t('common:COMMON.TOTAL'), property: 'total' },
  {
    color: colors[Colors.ORANGE],
    isVisible: false,
    label: i18n.t('collection:STATS.LABELS.PRICE_WORK'),
    property: 'workPrice',
  },
  {
    color: colors[Colors.RED],
    isVisible: false,
    label: i18n.t('collection:STATS.LABELS.PRICE_SELL'),
    property: 'sellingPrice',
  },
];
