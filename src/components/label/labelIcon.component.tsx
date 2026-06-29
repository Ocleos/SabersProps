import { Typography } from 'heroui-native/text';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '../ui/icon.component';
import { HStack } from '../ui/stack.component';

type LabelIconProps = {
  icon: LucideIcon;
  label: string;
};

const LabelIcon: React.FC<LabelIconProps> = (props) => {
  return (
    <HStack className='items-center gap-2'>
      <Icon as={props.icon} className='text-accent' />
      <Typography>{props.label}</Typography>
    </HStack>
  );
};

export default LabelIcon;
