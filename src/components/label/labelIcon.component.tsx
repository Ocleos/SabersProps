import type { LucideIcon } from 'lucide-react-native';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { HStack } from '~ui/stack';
import { Text } from '~ui/text';

interface ILabelIcon {
  label: string;
  icon: LucideIcon;
}

const LabelIcon: React.FC<ILabelIcon> = (props) => {
  return (
    <HStack className='gap-2'>
      <props.icon color={colorsTheme.primary[500]} />
      <Text>{props.label}</Text>
    </HStack>
  );
};

export default LabelIcon;
