import StateFilter from './stateFilter.component';
import TypeFilter from './typeFilter.component';
import FormControlWrapper from '@src/components/form/formControlWrapper.component';
import { PropState } from '@src/models/propState.model';
import { PropType } from '@src/models/propType.model';
import { useCollectionStore } from '@src/modules/collection/store/collection.store';
import { Actionsheet, Flex, HStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';

const PropFilters: React.FC = () => {
  const { t } = useTranslation(['collection']);

  const { isFiltersOpen, setIsFiltersOpen } = useCollectionStore();

  const onClose = () => {
    setIsFiltersOpen(false);
  };

  const { control } = useForm({
    mode: 'onChange',
  });

  const maxWidth = Dimensions.get('window').width - 48;

  return (
    <Actionsheet isOpen={isFiltersOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item>
          <FormControlWrapper label={t('collection:LABELS.TYPE')} name='type' control={control}>
            <HStack space={2}>
              <TypeFilter type={PropType.LIGHTSABER} />
              <TypeFilter type={PropType.PROP} />
              <TypeFilter type={PropType.COSTUME} />
            </HStack>
          </FormControlWrapper>
        </Actionsheet.Item>

        <Actionsheet.Item>
          <FormControlWrapper label={t('collection:LABELS.STATE')} name='state' control={control}>
            <Flex flexDirection='row' flexWrap='wrap' maxW={`${maxWidth}px`} style={{ gap: 8 }}>
              <StateFilter state={PropState.PRODUCTION} />
              <StateFilter state={PropState.DESIGN} />
              <StateFilter state={PropState.MISSING_PIECES} />
              <StateFilter state={PropState.READY} />
              <StateFilter state={PropState.IN_PROGRESS} />
              <StateFilter state={PropState.DONE} />
              <StateFilter state={PropState.ON_SALE} />
              <StateFilter state={PropState.SOLD} />
            </Flex>
          </FormControlWrapper>
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default PropFilters;
