import { HStack, Large, VStack } from '@sabersprops/ui';
import { useTranslation } from 'react-i18next';
import { PropState } from '~src/models/propState.model';
import { PropType } from '~src/models/propType.model';
import StateFilter from './stateFilter.component';
import TypeFilter from './typeFilter.component';

const PropFilters: React.FC = () => {
  const { t } = useTranslation(['collection']);

  return (
    <VStack className='gap-4 p-4'>
      <VStack className='gap-2'>
        <Large>{t('collection:LABELS.TYPE')}</Large>
        <HStack className='flex-wrap gap-2'>
          <TypeFilter type={PropType.LIGHTSABER} />
          <TypeFilter type={PropType.PROP} />
          <TypeFilter type={PropType.COSTUME} />
        </HStack>
      </VStack>

      <VStack className='gap-2'>
        <Large>{t('collection:LABELS.STATE')}</Large>
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
