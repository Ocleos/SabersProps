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
  [PropState.PRODUCTION]: { colorScheme: 'red', icon: CircleDashedIcon, label: i18n.t('collection:STATE.PRODUCTION') },
  [PropState.DESIGN]: { colorScheme: 'red', icon: CircleDotDashedIcon, label: i18n.t('collection:STATE.DESIGN') },
  [PropState.MISSING_PIECES]: {
    colorScheme: 'orange',
    icon: CircleAlertIcon,
    label: i18n.t('collection:STATE.MISSING_PIECES'),
  },
  [PropState.READY]: { colorScheme: 'orange', icon: CircleDotIcon, label: i18n.t('collection:STATE.READY') },
  [PropState.IN_PROGRESS]: {
    colorScheme: 'orange',
    icon: CircleEllipsisIcon,
    label: i18n.t('collection:STATE.IN_PROGRESS'),
  },
  [PropState.DONE]: { colorScheme: 'green', icon: CircleCheckBigIcon, label: i18n.t('collection:STATE.DONE') },
  [PropState.ON_SALE]: { colorScheme: 'blue', icon: CircleFadingPlusIcon, label: i18n.t('collection:STATE.ON_SALE') },
  [PropState.SOLD]: { colorScheme: 'blue', icon: BadgeEuroIcon, label: i18n.t('collection:STATE.SOLD') },
};
