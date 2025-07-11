import { useIsFocused } from '@react-navigation/native';
import { Skeleton, VStack } from '@sabersprops/ui';
import { useQuery } from '@tanstack/react-query';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_ACCESSORIES_TABLE } from '~src/utils/supabase.utils';
import TodoCard from '../components/todoCard.component';
import type { TodoAccessories } from '../models/todoAccessories.model';
import { TodoType } from '../models/todoType.model';

const Todos: React.FC = () => {
  const isFocused = useIsFocused();

  const { data, isLoading } = useQuery({
    queryFn: async () => await getData<TodoAccessories>(PROPS_ACCESSORIES_TABLE),
    queryKey: propsKeys.todos(),
    subscribed: isFocused,
  });

  return (
    <>
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
    </>
  );
};

export default Todos;
