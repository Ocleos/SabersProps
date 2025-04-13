import { useIsFocused } from '@react-navigation/native';
import { Skeleton, VStack } from '@sabersprops/ui';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_PRICES_TABLE, getData } from '~src/utils/supabase.utils';
import type { PricesInfosData } from '../../models/pricesInfosData.model';
import PricesChart from './pricesChart.component';
import PricesInfos from './pricesInfos.component';

const PricesCard = () => {
  const { t } = useTranslation(['stats']);

  const isFocused = useIsFocused();

  const { data, isLoading } = useQuery({
    queryKey: propsKeys.statsPrices(),
    queryFn: async () => await getData<PricesInfosData>(PROPS_PRICES_TABLE),
    subscribed: isFocused,
  });

  return (
    <CollapseCard title={t('stats:LABEL.PRICES')} isOpened={false}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </VStack>
      )}
      {data && (
        <VStack className='gap-4'>
          <PricesInfos data={data} />
          <PricesChart data={data} />
        </VStack>
      )}
    </CollapseCard>
  );
};

export default PricesCard;
