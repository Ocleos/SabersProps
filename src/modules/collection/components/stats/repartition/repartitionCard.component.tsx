import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router';
import { Skeleton } from 'heroui-native/skeleton';
import { Tabs } from 'heroui-native/tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { VStack } from '~src/components/ui/stack.component';
import type { Prop } from '~src/modules/collection/types/prop.type';
import { PropType, propTypes } from '~src/modules/collection/types/propType.type';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_TABLE } from '~src/utils/supabase.utils';
import { calculateRepartition } from './repartition.utils';
import RepartitionChart from './repartitionChart.component';
import RepartitionTable from './repartitionTable.component';

const RepartitionCard = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { data: repartition, isLoading } = useQuery({
    queryFn: async () => await getData<Prop>(PROPS_TABLE),
    queryKey: propsKeys.statsRepartition(),
    select: (data) => calculateRepartition(data),
    subscribed: isFocused,
  });

  const [propType, setPropType] = useState(PropType.LIGHTSABER.toString());

  return (
    <AccordionWrapper itemValue='repartition' title={t('collection:STATS.LABELS.REPARTITION')}>
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

          <Tabs onValueChange={setPropType} value={propType}>
            <Tabs.List className='w-full'>
              <Tabs.Indicator />
              <Tabs.Trigger className='w-1/3' value={PropType.LIGHTSABER.toString()}>
                <Tabs.Label>{propTypes[PropType.LIGHTSABER].label}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger className='w-1/3' value={PropType.PROP.toString()}>
                <Tabs.Label>{propTypes[PropType.PROP].label}</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger className='w-1/3' value={PropType.COSTUME.toString()}>
                <Tabs.Label>{propTypes[PropType.COSTUME].label}</Tabs.Label>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs>

          <RepartitionChart data={repartition.states} propType={propType} />
        </VStack>
      )}
    </AccordionWrapper>
  );
};

export default RepartitionCard;
