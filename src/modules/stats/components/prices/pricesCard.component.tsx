import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Skeleton } from '~rnr/ui/skeleton';
import { VStack } from '~rnr/ui/stack';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { PricesInfosData } from '~src/modules/stats/models/pricesInfosData.model';
import { PROPS_PRICES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import PricesChart from './pricesChart.component';
import PricesInfos from './pricesInfos.component';

const PricesCard = () => {
  const { t } = useTranslation(['stats']);

  const { data, isLoading } = useSWR(PROPS_PRICES_URL_ENDPOINT, getData<PricesInfosData>);

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
