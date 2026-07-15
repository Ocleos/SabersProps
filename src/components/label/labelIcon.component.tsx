import { Skeleton } from 'heroui-native/skeleton';
import { Typography } from 'heroui-native/text';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '../ui/icon.component';
import { HStack } from '../ui/stack.component';

type LabelIconProps = {
  icon: LucideIcon;
  isLoading?: boolean;
  label: string;
};

const LabelIcon: React.FC<LabelIconProps> = (props) => {
  const { icon, isLoading, label } = props;

  return (
    <HStack className='items-center gap-2'>
      <Icon as={icon} className='text-accent' />
      {isLoading ? <Skeleton className='h-7 w-32' /> : <Typography>{label}</Typography>}
    </HStack>
  );
};

export default LabelIcon;
