import type { LucideIcon } from 'lucide-react-native';
import type { SvgProps } from 'react-native-svg';
import BlasterIcon from '~src/assets/icons/blaster.icon';
import CostumeIcon from '~src/assets/icons/costume.icon';
import LightsabersIcon from '~src/assets/icons/lightsabers.icon';
import i18n from '~src/i18n.config';

export enum PropType {
  LIGHTSABER = 1,
  PROP = 2,
  COSTUME = 3,
}

export type IPropType = {
  icon: React.FC<SvgProps> | LucideIcon;
  label: string;
};

export const propTypes: Record<PropType, IPropType> = {
  [PropType.LIGHTSABER]: { icon: LightsabersIcon, label: i18n.t('collection:TYPE.LIGHTSABER') },
  [PropType.PROP]: { icon: BlasterIcon, label: i18n.t('collection:TYPE.PROP') },
  [PropType.COSTUME]: { icon: CostumeIcon, label: i18n.t('collection:TYPE.COSTUME') },
};
