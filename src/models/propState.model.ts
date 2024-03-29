import {
  BadgeEuro,
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
  CircleEllipsis,
  CircleFadingPlus,
  type LucideIcon,
} from 'lucide-react-native';
import i18n from '~src/i18n.config';

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

export type IPropState = {
  colorScheme: string;
  label: string;
  icon: LucideIcon;
};

export const propStates: Record<PropState, IPropState> = {
  [PropState.PRODUCTION]: { colorScheme: 'red', label: i18n.t('collection:STATE.PRODUCTION'), icon: CircleDashed },
  [PropState.DESIGN]: { colorScheme: 'red', label: i18n.t('collection:STATE.DESIGN'), icon: CircleDotDashed },
  [PropState.MISSING_PIECES]: {
    colorScheme: 'orange',
    label: i18n.t('collection:STATE.MISSING_PIECES'),
    icon: CircleAlert,
  },
  [PropState.READY]: { colorScheme: 'orange', label: i18n.t('collection:STATE.READY'), icon: CircleDot },
  [PropState.IN_PROGRESS]: {
    colorScheme: 'orange',
    label: i18n.t('collection:STATE.IN_PROGRESS'),
    icon: CircleEllipsis,
  },
  [PropState.DONE]: { colorScheme: 'green', label: i18n.t('collection:STATE.DONE'), icon: CircleCheckBig },
  [PropState.ON_SALE]: { colorScheme: 'blue', label: i18n.t('collection:STATE.ON_SALE'), icon: CircleFadingPlus },
  [PropState.SOLD]: { colorScheme: 'blue', label: i18n.t('collection:STATE.SOLD'), icon: BadgeEuro },
};
