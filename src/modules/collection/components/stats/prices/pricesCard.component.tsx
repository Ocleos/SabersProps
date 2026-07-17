import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router/react-navigation';
import { Skeleton } from 'heroui-native/skeleton';
import { useTranslation } from 'react-i18next';
import EmptyComponent from '~src/components/empty/empty.component';
import ErrorComponent from '~src/components/error/error.component';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { VStack } from '~src/components/ui/stack.component';
import type { PricesInfosData } from '~src/modules/collection/types/pricesInfosData.type';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_PRICES_TABLE } from '~src/utils/supabase.utils';
import PricesChart from './pricesChart.component';
import PricesInfos from './pricesInfos.component';

const PricesCard = () => {
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: async () => await getData<PricesInfosData>(PROPS_PRICES_TABLE),
    queryKey: propsKeys.statsPrices(),
    subscribed: isFocused,
  });

  return (
    <AccordionWrapper itemValue='prices' title={t('collection:STATS.LABELS.PRICES')}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </VStack>
      )}
      {isError && <ErrorComponent onRetry={() => refetch()} />}
      {!isLoading && !isError && data && data.length === 0 && <EmptyComponent />}
      {data && data.length > 0 && (
        <VStack className='gap-4'>
          <PricesInfos data={data} />
          <PricesChart data={data} />
        </VStack>
      )}
    </AccordionWrapper>
  );
};

export default PricesCard;
