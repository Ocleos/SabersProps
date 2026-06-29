import { Skeleton } from 'heroui-native/skeleton';
import { Surface } from 'heroui-native/surface';
import { Typography } from 'heroui-native/text';
import type { LucideIcon } from 'lucide-react-native';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';

type StatTileProps = {
  icon: LucideIcon;
  isLoading?: boolean;
  label: string;
  value?: number;
};

const StatTile: React.FC<StatTileProps> = ({ icon, isLoading, label, value }) => {
  return (
    <Surface className='flex-1' variant='secondary'>
      <VStack className='gap-2'>
        <Icon as={icon} className='text-accent' />

        {isLoading ? <Skeleton className='h-9 w-20' /> : <Typography type='h2'>{value ?? 0}</Typography>}

        <Typography className='text-muted'>{label}</Typography>
      </VStack>
    </Surface>
  );
};

export default StatTile;
