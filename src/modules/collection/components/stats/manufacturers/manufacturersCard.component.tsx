import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router/react-navigation';
import { Skeleton } from 'heroui-native/skeleton';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import EmptyComponent from '~src/components/empty/empty.component';
import ErrorComponent from '~src/components/error/error.component';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import ProgressBarWrapper from '~src/components/ui/progressBarWrapper.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import type { Prop } from '~src/modules/collection/types/prop.type';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_TABLE } from '~src/utils/supabase.utils';
import { calculateFieldRepartition } from '../fieldRepartition.utils';

const ManufacturersCard = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data: manufacturers,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getData<Prop>(PROPS_TABLE),
    queryKey: propsKeys.statsRepartition(),
    select: (data) => calculateFieldRepartition(data.flatMap((prop) => prop.manufacturer.split(' / '))),
    subscribed: isFocused,
  });

  return (
    <AccordionWrapper itemValue='manufacturers' title={t('collection:STATS.LABELS.MANUFACTURERS')}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </VStack>
      )}

      {isError && <ErrorComponent onRetry={() => refetch()} />}

      {!isLoading && !isError && manufacturers && manufacturers.length === 0 && <EmptyComponent />}

      {manufacturers && manufacturers.length > 0 && (
        <VStack className='gap-4'>
          {manufacturers.map((item) => (
            <VStack className='gap-1' key={item.value}>
              <HStack className='items-center justify-between'>
                <Typography>{item.value}</Typography>
                <Typography className='text-muted text-sm'>{`${item.count} (${item.percentage} %)`}</Typography>
              </HStack>
              <ProgressBarWrapper value={item.percentage} />
            </VStack>
          ))}
        </VStack>
      )}
    </AccordionWrapper>
  );
};

export default ManufacturersCard;
