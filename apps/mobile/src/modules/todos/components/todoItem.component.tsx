import { HStack, Icon, Text } from '@sabersprops/ui';
import { SquareCheckBigIcon, SquareIcon } from 'lucide-react-native';

type TodoItemProps = {
  name: string;
  value: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ name, value }) => {
  return (
    <HStack className='items-center gap-2'>
      <Icon as={value ? SquareCheckBigIcon : SquareIcon} className='text-primary' />
      <Text className={value ? 'text-muted-foreground line-through' : 'text-foreground'}>{name}</Text>
    </HStack>
  );
};

export default TodoItem;
