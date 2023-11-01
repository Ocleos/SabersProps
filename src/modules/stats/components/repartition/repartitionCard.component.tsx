import { Spinner, VStack } from '@gluestack-ui/themed';
import { isNil } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import CollapseCard from '~src/components/card/collapseCard.component';
import { Prop } from '~src/models/prop.model';
import { PROPS_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import { useRepartitionStore } from '../../stores/repartition.store';
import RepartitionChart from './repartitionChart.component';
import RepartitionTable from './repartitionTable.component';

const RepartitionCard = () => {
  const { t } = useTranslation(['stats']);

  const { data } = useSWR(PROPS_URL_ENDPOINT, getData<Prop>);

  const { repartition, calculateRepartition } = useRepartitionStore();

  useEffect(() => {
    if (data) {
      calculateRepartition(data);
    }
  }, [data, calculateRepartition]);

  return (
    <CollapseCard title={t('stats:LABEL.REPARTITION')} isOpened={false}>
      {isNil(repartition) ? (
        <Spinner size={'large'} />
      ) : (
        <VStack gap={'$4'}>
          <RepartitionTable data={repartition} />
          <RepartitionChart data={repartition.states} />
        </VStack>
      )}
    </CollapseCard>
  );
};

export default RepartitionCard;
