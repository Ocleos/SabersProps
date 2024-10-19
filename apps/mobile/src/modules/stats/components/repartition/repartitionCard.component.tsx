import { Skeleton, Tabs, TabsList, TabsTrigger, Text, VStack } from '@sabersprops/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { Prop } from '~src/models/prop.model';
import { PropType, propTypes } from '~src/models/propType.model';
import { PROPS_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import { calculateRepartition } from './repartition.utils';
import RepartitionChart from './repartitionChart.component';
import RepartitionTable from './repartitionTable.component';

const RepartitionCard = () => {
  const { t } = useTranslation(['stats']);

  const { data } = useSWR(PROPS_URL_ENDPOINT, getData<Prop>);

  const [propType, setPropType] = useState(PropType.LIGHTSABER.toString());

  const repartition = useMemo(() => (data ? calculateRepartition(data) : undefined), [data]);

  return (
    <CollapseCard title={t('stats:LABEL.REPARTITION')} isOpened={false}>
      {repartition ? (
        <VStack className='gap-4'>
          <RepartitionTable data={repartition} />

          <Tabs value={propType} onValueChange={(value) => setPropType(value)}>
            <TabsList>
              <TabsTrigger value={PropType.LIGHTSABER.toString()}>
                <Text>{propTypes[PropType.LIGHTSABER].label}</Text>
              </TabsTrigger>
              <TabsTrigger value={PropType.PROP.toString()}>
                <Text>{propTypes[PropType.PROP].label}</Text>
              </TabsTrigger>
              <TabsTrigger value={PropType.COSTUME.toString()}>
                <Text>{propTypes[PropType.COSTUME].label}</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <RepartitionChart data={repartition.states} propType={propType} />
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
