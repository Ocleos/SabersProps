import { VStack } from '@sabersprops/ui';
import useSWR from 'swr';
import { PROPS_ACCESSORIES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import TodoCard from '../components/todoCard.component';
import type { TodoAccessories } from '../models/todoAccessories.model';
import { TodoType } from '../models/todoType.model';

const Todos: React.FC = () => {
  const { data } = useSWR(PROPS_ACCESSORIES_URL_ENDPOINT, getData<TodoAccessories>);

  return (
    data && (
      <VStack className='gap-4'>
        <TodoCard data={data} type={TodoType.PROP} />
        <TodoCard data={data} type={TodoType.BAG} />
        <TodoCard data={data} type={TodoType.KEYRING} />
        <TodoCard data={data} type={TodoType.DISPLAY_PLAQUE} />
      </VStack>
    )
  );
};

export default Todos;
