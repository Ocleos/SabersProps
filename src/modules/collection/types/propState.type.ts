import {
  BadgeEuroIcon,
  CircleAlertIcon,
  CircleCheckBigIcon,
  CircleDashedIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  CircleEllipsisIcon,
  CircleFadingPlusIcon,
  type LucideIcon,
} from 'lucide-react-native';
import i18n from '~src/i18n.config';
import { type ColorScheme, Colors, colors } from '~src/theme/colors.theme';

export enum PropState {
  PRODUCTION = 1,
  DESIGN = 2,
  MISSING_PIECES = 3,
  READY = 4,
  IN_PROGRESS = 5,
  DONE = 6,
  ON_SALE = 7,
  SOLD = 8,
}

type IPropState = {
  colorScheme: ColorScheme;
  label: string;
  icon: LucideIcon;
};

export const propStates: Record<PropState, IPropState> = {
  [PropState.PRODUCTION]: {
    colorScheme: colors[Colors.RED],
    icon: CircleDashedIcon,
    label: i18n.t('collection:STATE.PRODUCTION'),
  },
  [PropState.DESIGN]: {
    colorScheme: colors[Colors.RED],
    icon: CircleDotDashedIcon,
    label: i18n.t('collection:STATE.DESIGN'),
  },
  [PropState.MISSING_PIECES]: {
    colorScheme: colors[Colors.ORANGE],
    icon: CircleAlertIcon,
    label: i18n.t('collection:STATE.MISSING_PIECES'),
  },
  [PropState.READY]: {
    colorScheme: colors[Colors.ORANGE],
    icon: CircleDotIcon,
    label: i18n.t('collection:STATE.READY'),
  },
  [PropState.IN_PROGRESS]: {
    colorScheme: colors[Colors.ORANGE],
    icon: CircleEllipsisIcon,
    label: i18n.t('collection:STATE.IN_PROGRESS'),
  },
  [PropState.DONE]: {
    colorScheme: colors[Colors.GREEN],
    icon: CircleCheckBigIcon,
    label: i18n.t('collection:STATE.DONE'),
  },
  [PropState.ON_SALE]: {
    colorScheme: colors[Colors.BLUE],
    icon: CircleFadingPlusIcon,
    label: i18n.t('collection:STATE.ON_SALE'),
  },
  [PropState.SOLD]: { colorScheme: colors[Colors.BLUE], icon: BadgeEuroIcon, label: i18n.t('collection:STATE.SOLD') },
};
