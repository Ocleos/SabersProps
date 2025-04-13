import { useIsFocused } from '@react-navigation/native';
import { Skeleton, Tabs, TabsList, TabsTrigger, Text, VStack } from '@sabersprops/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { Prop } from '~src/models/prop.model';
import { PropType, propTypes } from '~src/models/propType.model';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE, getData } from '~src/utils/supabase.utils';
import { calculateRepartition } from './repartition.utils';
import RepartitionChart from './repartitionChart.component';
import RepartitionTable from './repartitionTable.component';

const RepartitionCard = () => {
  const { t } = useTranslation(['stats']);
  const isFocused = useIsFocused();

  const { data: repartition, isLoading } = useQuery({
    queryKey: propsKeys.statsRepartition(),
    queryFn: async () => await getData<Prop>(PROPS_TABLE),
    subscribed: isFocused,
    select: (data) => calculateRepartition(data),
  });

  const [propType, setPropType] = useState(PropType.LIGHTSABER.toString());

  return (
    <CollapseCard title={t('stats:LABEL.REPARTITION')} isOpened={false}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </VStack>
      )}
      {repartition && (
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
      )}
    </CollapseCard>
  );
};

export default RepartitionCard;
