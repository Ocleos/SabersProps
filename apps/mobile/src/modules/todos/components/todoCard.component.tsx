import { VStack } from '@sabersprops/ui';
import { get } from 'radash';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { TodoAccessories } from '../models/todoAccessories.model';
import { type TodoType, todoTypes } from '../models/todoType.model';
import TodoItem from './todoItem.component';

type TodoCardProps = {
  data: TodoAccessories[];
  type: TodoType;
};

const TodoCard: React.FC<TodoCardProps> = ({ data, type }) => {
  const propertyName = todoTypes[type].propertyName;

  const total = data.length;
  const count = data.reduce((acc, item) => {
    const value: boolean = get(item, propertyName);

    return value ? acc : acc + 1;
  }, 0);

  const title = `${todoTypes[type].label} (${count} / ${total})`;

  return (
    <CollapseCard title={title}>
      <VStack className='gap-2'>
        {data.map((accessory) => (
          <TodoItem key={accessory.id} name={accessory.name} value={get(accessory, propertyName) ?? false} />
        ))}
      </VStack>
    </CollapseCard>
  );
};

export default TodoCard;
