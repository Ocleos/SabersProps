import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, type LucideIcon } from 'lucide-react-native';
import i18n from '~src/i18n.config';

export enum PropColumnPlacement {
  LEFT = 1,
  MIDDLE = 2,
  RIGHT = 3,
}

type IPropColumnPlacement = {
  icon: LucideIcon;
  label: string;
};

export const propColumnPlacements: Record<PropColumnPlacement, IPropColumnPlacement> = {
  [PropColumnPlacement.LEFT]: { icon: AlignLeftIcon, label: i18n.t('collection:COLUMN.LEFT') },
  [PropColumnPlacement.MIDDLE]: { icon: AlignCenterIcon, label: i18n.t('collection:COLUMN.MIDDLE') },
  [PropColumnPlacement.RIGHT]: { icon: AlignRightIcon, label: i18n.t('collection:COLUMN.RIGHT') },
};
