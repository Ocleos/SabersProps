import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Skeleton } from '~rnr/ui/skeleton';
import { VStack } from '~rnr/ui/stack';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { Prop } from '~src/models/prop.model';
import { PROPS_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import { calculateRepartition } from './repartition.utils';
import RepartitionChart from './repartitionChart.component';
import RepartitionTable from './repartitionTable.component';

const RepartitionCard = () => {
  const { t } = useTranslation(['stats']);

  const { data } = useSWR(PROPS_URL_ENDPOINT, getData<Prop>);

  const repartition = useMemo(() => (data ? calculateRepartition(data) : undefined), [data]);

  return (
    <CollapseCard title={t('stats:LABEL.REPARTITION')} isOpened={false}>
      {repartition ? (
        <VStack className='gap-4'>
          <RepartitionTable data={repartition} />
          <RepartitionChart data={repartition.states} />
        </VStack>
      ) : (
        <VStack className='gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </VStack>
      )}
    </CollapseCard>
  );
};

export default RepartitionCard;
