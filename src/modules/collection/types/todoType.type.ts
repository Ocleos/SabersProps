import { KeyRoundIcon, ListChecksIcon, type LucideIcon, ShoppingBagIcon, TagIcon } from 'lucide-react-native';
import i18n from '~src/i18n.config';
import type { TodoAccessories } from './todoAccessories.type';

export enum TodoType {
  PROP = 0,
  BAG = 1,
  KEYRING = 2,
  DISPLAY_PLAQUE = 3,
}

type TodoTypeMetadata = {
  icon: LucideIcon;
  label: string;
  propertyName: keyof Pick<TodoAccessories, 'prop' | 'bag' | 'keyring' | 'displayPlaque'>;
};

export const todoTypes: Record<TodoType, TodoTypeMetadata> = {
  [TodoType.PROP]: {
    icon: ListChecksIcon,
    label: i18n.t('common:COMMON.PROP'),
    propertyName: 'prop',
  },
  [TodoType.BAG]: {
    icon: ShoppingBagIcon,
    label: i18n.t('collection:TYPE_ACCESSORY.BAG'),
    propertyName: 'bag',
  },
  [TodoType.KEYRING]: {
    icon: KeyRoundIcon,
    label: i18n.t('collection:TYPE_ACCESSORY.KEYRING'),
    propertyName: 'keyring',
  },
  [TodoType.DISPLAY_PLAQUE]: {
    icon: TagIcon,
    label: i18n.t('collection:TYPE_ACCESSORY.DISPLAY_PLAQUE'),
    propertyName: 'displayPlaque',
  },
};
