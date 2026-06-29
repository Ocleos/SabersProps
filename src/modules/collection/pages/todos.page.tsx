import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router';
import { Skeleton } from 'heroui-native/skeleton';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import { VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_ACCESSORIES_TABLE } from '~src/utils/supabase.utils';
import TodoCard from '../components/todos/todoCard.component';
import type { TodoAccessories } from '../types/todoAccessories.type';
import { TodoType } from '../types/todoType.type';

const TodosPage: React.FC = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { data, isLoading } = useQuery({
    queryFn: async () => await getData<TodoAccessories>(PROPS_ACCESSORIES_TABLE),
    queryKey: propsKeys.todos(),
    subscribed: isFocused,
  });

  return (
    <PageLayout isScrollable={true} title={t('collection:ROUTING.TODOS')}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-14 w-full' />
          <Skeleton className='h-14 w-full' />
          <Skeleton className='h-14 w-full' />
          <Skeleton className='h-14 w-full' />
        </VStack>
      )}
      {data && (
        <VStack className='gap-4'>
          <TodoCard data={data} type={TodoType.PROP} />
          <TodoCard data={data} type={TodoType.BAG} />
          <TodoCard data={data} type={TodoType.KEYRING} />
          <TodoCard data={data} type={TodoType.DISPLAY_PLAQUE} />
        </VStack>
      )}
    </PageLayout>
  );
};

export default TodosPage;
