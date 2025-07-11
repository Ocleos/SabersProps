import { colorsTheme, DEFAULT_ICON_SIZE, HStack, Text } from '@sabersprops/ui';
import { SquareCheckBigIcon, SquareIcon } from 'lucide-react-native';

type TodoItemProps = {
  name: string;
  value: boolean;
};

const TodoItem: React.FC<TodoItemProps> = ({ name, value }) => {
  return (
    <HStack className='items-center gap-2'>
      {value ? (
        <SquareCheckBigIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
      ) : (
        <SquareIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
      )}

      <Text className={value ? 'text-muted-foreground line-through' : 'text-foreground'}>{name}</Text>
    </HStack>
  );
};

export default TodoItem;
