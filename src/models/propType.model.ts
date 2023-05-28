import i18n from '@src/i18n.config';

export enum PropType {
  NONE = 0,
  LIGHTSABER = 1,
  PROP = 2,
  COSTUME = 3,
}

export interface IPropType {
  iconName: string;
  label: string;
}

export const propTypes: Record<PropType, IPropType> = {
  [PropType.NONE]: { iconName: '', label: '' },
  [PropType.LIGHTSABER]: { iconName: 'lightsabers', label: i18n.t('collection:TYPE.LIGHTSABER') },
  [PropType.PROP]: { iconName: 'blaster', label: i18n.t('collection:TYPE.PROP') },
  [PropType.COSTUME]: { iconName: 'deathTrooper', label: i18n.t('collection:TYPE.COSTUME') },
};
