import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router';
import { Skeleton } from 'heroui-native/skeleton';
import { useTranslation } from 'react-i18next';
import EmptyComponent from '~src/components/empty/empty.component';
import ErrorComponent from '~src/components/error/error.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_ACCESSORIES_TABLE } from '~src/utils/supabase.utils';
import TodoCard from '../components/todos/todoCard.component';
import TodosOverviewCard from '../components/todos/todosOverviewCard.component';
import type { TodoAccessories } from '../types/todoAccessories.type';
import { TodoType } from '../types/todoType.type';

const TodosPage: React.FC = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: async () => await getData<TodoAccessories>(PROPS_ACCESSORIES_TABLE),
    queryKey: propsKeys.todos(),
    subscribed: isFocused,
  });

  return (
    <PageLayout isScrollable={true} title={t('collection:ROUTING.TODOS')}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-[300] w-full' />
          <Skeleton className='h-15 w-full' />
          <Skeleton className='h-15 w-full' />
          <Skeleton className='h-15 w-full' />
          <Skeleton className='h-15 w-full' />
        </VStack>
      )}
      {isError && <ErrorComponent onRetry={() => refetch()} />}
      {!isLoading &&
        !isError &&
        (data && data.length > 0 ? (
          <VStack className='gap-4'>
            <TodosOverviewCard data={data} />
            <TodoCard data={data} type={TodoType.PROP} />
            <TodoCard data={data} type={TodoType.BAG} />
            <TodoCard data={data} type={TodoType.KEYRING} />
            <TodoCard data={data} type={TodoType.DISPLAY_PLAQUE} />
          </VStack>
        ) : (
          <EmptyComponent />
        ))}
    </PageLayout>
  );
};

export default TodosPage;
