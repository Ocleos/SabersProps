import { HStack, Text, VStack } from '@sabersprops/ui';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PropState } from '~src/models/propState.model';
import { PropType } from '~src/models/propType.model';
import StateFilter from './stateFilter.component';
import TypeFilter from './typeFilter.component';

const PropFilters: React.FC = () => {
  const { t } = useTranslation(['collection']);

  const { bottom } = useSafeAreaInsets();

  return (
    <VStack className='gap-4 p-4' style={{ marginBottom: bottom }}>
      <VStack className='gap-2'>
        <Text variant='large'>{t('collection:LABELS.TYPE')}</Text>
        <HStack className='flex-wrap gap-2'>
          <TypeFilter type={PropType.LIGHTSABER} />
          <TypeFilter type={PropType.PROP} />
          <TypeFilter type={PropType.COSTUME} />
        </HStack>
      </VStack>

      <VStack className='gap-2'>
        <Text variant='large'>{t('collection:LABELS.STATE')}</Text>
        <HStack className='flex-wrap gap-2'>
          <StateFilter state={PropState.PRODUCTION} />
          <StateFilter state={PropState.DESIGN} />
          <StateFilter state={PropState.MISSING_PIECES} />
          <StateFilter state={PropState.READY} />
          <StateFilter state={PropState.IN_PROGRESS} />
          <StateFilter state={PropState.DONE} />
          <StateFilter state={PropState.ON_SALE} />
          <StateFilter state={PropState.SOLD} />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default PropFilters;
