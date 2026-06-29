import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { VStack } from '~src/components/ui/stack.component';
import type { TodoAccessories } from '../../types/todoAccessories.type';
import { type TodoType, todoTypes } from '../../types/todoType.type';
import TodoItem from './todoItem.component';
import { countPending } from './todos.utils';

type TodoCardProps = {
  data: TodoAccessories[];
  type: TodoType;
};

const TodoCard: React.FC<TodoCardProps> = ({ data, type }) => {
  const { label, propertyName } = todoTypes[type];

  const total = data.length;
  const count = countPending(data, propertyName);

  const title = `${label} (${count} / ${total})`;

  return (
    <AccordionWrapper itemValue={propertyName} title={title}>
      <VStack className='gap-2'>
        {data.map((accessory) => (
          <TodoItem key={accessory.id} name={accessory.name} value={accessory[propertyName] ?? false} />
        ))}
      </VStack>
    </AccordionWrapper>
  );
};

export default TodoCard;
