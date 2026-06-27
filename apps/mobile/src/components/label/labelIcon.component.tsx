import { HStack, Icon, Text } from '@sabersprops/ui';
import type { LucideIcon } from 'lucide-react-native';

interface ILabelIcon {
  icon: LucideIcon;
  label: string;
}

const LabelIcon: React.FC<ILabelIcon> = (props) => {
  return (
    <HStack className='gap-2'>
      <Icon as={props.icon} className='text-primary' />
      <Text>{props.label}</Text>
    </HStack>
  );
};

export default LabelIcon;
