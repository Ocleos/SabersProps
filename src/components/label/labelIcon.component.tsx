import type { LucideIcon } from 'lucide-react-native';
import { HStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { colorsTheme } from '~src/theme/nativewind.theme';

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
