import { DEFAULT_ICON_SIZE, HStack, Text, colorsTheme } from '@sabersprops/ui';
import { SquareCheckBigIcon, SquareIcon } from 'lucide-react-native';

type TodoItemProps = {
  name: string;
  value: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ name, value }) => {
  return (
    <HStack className='items-center gap-2'>
      {value ? (
        <SquareCheckBigIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
      ) : (
        <SquareIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
      )}

      <Text className={value ? 'text-muted-foreground line-through' : 'text-foreground'}>{name}</Text>
    </HStack>
  );
};

export default TodoItem;
