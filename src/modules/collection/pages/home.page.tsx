import { useQuery } from '@tanstack/react-query';
import { useIsFocused, useRouter } from 'expo-router';
import { ChartColumnIcon, ClipboardListIcon, ListChecksIcon, SwordIcon, SwordsIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_ACCESSORIES_TABLE, PROPS_TABLE } from '~src/utils/supabase.utils';
import DashboardNavCard from '../components/dashboard/dashboardNavCard.component';
import StatTile from '../components/dashboard/statTile.component';
import { calculateRepartition } from '../components/stats/repartition/repartition.utils';
import { countPendingTodos } from '../components/todos/todos.utils';
import type { Prop } from '../types/prop.type';
import type { TodoAccessories } from '../types/todoAccessories.type';

const HomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isFocused = useIsFocused();

  const { data: totalProps, isLoading: isLoadingProps } = useQuery({
    queryFn: async () => await getData<Prop>(PROPS_TABLE),
    queryKey: propsKeys.statsRepartition(),
    select: (data) => calculateRepartition(data),
    subscribed: isFocused,
  });

  const { data: pendingTodos, isLoading: isLoadingTodos } = useQuery({
    queryFn: async () => await getData<TodoAccessories>(PROPS_ACCESSORIES_TABLE),
    queryKey: propsKeys.todos(),
    select: countPendingTodos,
    subscribed: isFocused,
  });

  return (
    <PageLayout isScrollable={true} title={t('collection:ROUTING.COLLECTION')}>
      <VStack className='gap-4'>
        <HStack className='gap-4'>
          <StatTile
            icon={SwordIcon}
            isLoading={isLoadingProps}
            label={t('collection:HOME.LABELS.TOTAL_LIGHTSABERS')}
            value={totalProps?.types[0]}
          />

          <StatTile
            icon={SwordsIcon}
            isLoading={isLoadingProps}
            label={t('collection:HOME.LABELS.TOTAL_PROPS')}
            value={totalProps?.total}
          />
        </HStack>

        <HStack className='gap-4'>
          <StatTile
            icon={ClipboardListIcon}
            isLoading={isLoadingTodos}
            label={t('collection:HOME.LABELS.PENDING_PROPS')}
            value={pendingTodos?.props}
          />

          <StatTile
            icon={ClipboardListIcon}
            isLoading={isLoadingTodos}
            label={t('collection:HOME.LABELS.PENDING_TODOS')}
            value={pendingTodos?.total}
          />
        </HStack>

        <DashboardNavCard
          description={t('collection:HOME.DESCRIPTIONS.COLLECTION')}
          icon={SwordsIcon}
          onPress={() => router.navigate('/(root)/collection/list')}
          title={t('collection:ROUTING.COLLECTION')}
        />

        <DashboardNavCard
          description={t('collection:HOME.DESCRIPTIONS.STATS')}
          icon={ChartColumnIcon}
          onPress={() => router.navigate('/(root)/collection/stats')}
          title={t('collection:ROUTING.STATS')}
        />

        <DashboardNavCard
          description={t('collection:HOME.DESCRIPTIONS.TODOS')}
          icon={ListChecksIcon}
          onPress={() => router.navigate('/(root)/collection/todos')}
          title={t('collection:ROUTING.TODOS')}
        />
      </VStack>
    </PageLayout>
  );
};

export default HomePage;
