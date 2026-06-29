import type { ColorScheme } from '~src/theme/colors.theme';

export type ChartPricesSeries = {
  label: string;
  property: string;
  color: ColorScheme;
  isVisible: boolean;
};
