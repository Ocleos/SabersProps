import { Typography } from 'heroui-native/text';
import { SquareCheckBigIcon, SquareIcon } from 'lucide-react-native';
import { Icon } from '~src/components/ui/icon.component';
import { HStack } from '~src/components/ui/stack.component';

type TodoItemProps = {
  name: string;
  value: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ name, value }) => {
  return (
    <HStack className='items-center gap-2'>
      <Icon as={value ? SquareCheckBigIcon : SquareIcon} className='text-accent' />
      <Typography className={value ? 'text-muted line-through' : 'text-foreground'}>{name}</Typography>
    </HStack>
  );
};

export default TodoItem;
