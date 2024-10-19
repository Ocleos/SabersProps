import { DEFAULT_ICON_SIZE, HStack, Text, colorsTheme } from '@sabersprops/ui';
import type { LucideIcon } from 'lucide-react-native';

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
