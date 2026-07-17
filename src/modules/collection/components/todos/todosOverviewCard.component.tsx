import { Surface } from 'heroui-native/surface';
import { Typography } from 'heroui-native/text';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '~src/components/ui/icon.component';
import ProgressBarWrapper from '~src/components/ui/progressBarWrapper.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import type { TodoAccessories } from '../../types/todoAccessories.type';
import { todoTypes } from '../../types/todoType.type';
import { computeTodosProgress } from './todos.utils';

type TodosOverviewCardProps = {
  data: TodoAccessories[];
};

const TodosOverviewCard: React.FC<TodosOverviewCardProps> = ({ data }) => {
  const { t } = useTranslation();

  const { overall, types } = useMemo(() => computeTodosProgress(data), [data]);

  return (
    <Surface variant='secondary'>
      <VStack className='gap-4'>
        <VStack className='gap-2'>
          <HStack className='items-center justify-between'>
            <Typography className='font-medium text-lg'>{t('collection:TODOS.LABELS.OVERALL_PROGRESS')}</Typography>
            <Typography className='text-muted'>{`${overall.percentage} %`}</Typography>
          </HStack>

          <ProgressBarWrapper value={overall.percentage} />
        </VStack>

        {types.map((todoType) => {
          const { type, completed, total, percentage } = todoType;
          const { icon, label } = todoTypes[type];

          return (
            <HStack className='items-center gap-2' key={type}>
              <Icon as={icon} className='text-accent' />

              <VStack className='flex-1 gap-1'>
                <HStack className='items-center justify-between'>
                  <Typography>{label}</Typography>
                  <Typography className='text-muted text-sm'>{`${completed} / ${total} (${percentage} %)`}</Typography>
                </HStack>
                <ProgressBarWrapper value={percentage} />
              </VStack>
            </HStack>
          );
        })}
      </VStack>
    </Surface>
  );
};

export default TodosOverviewCard;
