import type { LucideIcon } from 'lucide-react-native';
import { HStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';

interface ILabelIcon {
  label: string;
  icon: LucideIcon;
}

const LabelIcon: React.FC<ILabelIcon> = (props) => {
  return (
    <HStack className='gap-2'>
      <props.icon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
      <Text>{props.label}</Text>
    </HStack>
  );
};

export default LabelIcon;
