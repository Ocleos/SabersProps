import i18n from '~src/i18n.config';

export enum TodoType {
  PROP = 0,
  BAG = 1,
  KEYRING = 2,
  DISPLAY_PLAQUE = 3,
}

export type ITodoType = {
  label: string;
  propertyName: string;
};

export const todoTypes: Record<TodoType, ITodoType> = {
  [TodoType.PROP]: {
    label: i18n.t('common:COMMON.PROP'),
    propertyName: 'prop',
  },
  [TodoType.BAG]: {
    label: i18n.t('collection:TYPE_ACCESSORY.BAG'),
    propertyName: 'bag',
  },
  [TodoType.KEYRING]: {
    label: i18n.t('collection:TYPE_ACCESSORY.KEYRING'),
    propertyName: 'keyring',
  },
  [TodoType.DISPLAY_PLAQUE]: {
    label: i18n.t('collection:TYPE_ACCESSORY.DISPLAY_PLAQUE'),
    propertyName: 'displayPlaque',
  },
};
