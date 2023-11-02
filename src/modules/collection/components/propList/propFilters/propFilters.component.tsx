import { ActionsheetItem, Box, Heading, VStack } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import ActionsheetWrapper from '~src/components/menu/actionsheetWrapper.component';
import { PropState } from '~src/models/propState.model';
import { PropType } from '~src/models/propType.model';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import StateFilter from './stateFilter.component';
import TypeFilter from './typeFilter.component';

const PropFilters: React.FC = () => {
  const { t } = useTranslation(['collection']);

  const { isFiltersOpen, setIsFiltersOpen } = useCollectionStore();

  const onClose = () => {
    setIsFiltersOpen(false);
  };

  const paddingActionsheet = 20 * 2; // $2 (Actionsheet) + $3 (ActionsheetItem)
  const maxWidth = Dimensions.get('window').width - paddingActionsheet;

  return (
    <ActionsheetWrapper isOpen={isFiltersOpen} onClose={onClose}>
      <ActionsheetItem>
        <VStack gap={'$2'}>
          <Heading size={'sm'}>{t('collection:LABELS.TYPE')}</Heading>
          <Box flexDirection='row' flexWrap='wrap' gap={'$2'} style={{ maxWidth }}>
            <TypeFilter type={PropType.LIGHTSABER} />
            <TypeFilter type={PropType.PROP} />
            <TypeFilter type={PropType.COSTUME} />
          </Box>
        </VStack>
      </ActionsheetItem>

      <ActionsheetItem>
        <VStack gap={'$2'}>
          <Heading size={'sm'}>{t('collection:LABELS.STATE')}</Heading>
          <Box flexDirection='row' flexWrap='wrap' gap={'$2'} style={{ maxWidth }}>
            <StateFilter state={PropState.PRODUCTION} />
            <StateFilter state={PropState.DESIGN} />
            <StateFilter state={PropState.MISSING_PIECES} />
            <StateFilter state={PropState.READY} />
            <StateFilter state={PropState.IN_PROGRESS} />
            <StateFilter state={PropState.DONE} />
            <StateFilter state={PropState.ON_SALE} />
            <StateFilter state={PropState.SOLD} />
          </Box>
        </VStack>
      </ActionsheetItem>
    </ActionsheetWrapper>

    //     <Actionsheet.Item>
    //       {/* <FormControlWrapper label={t('collection:LABELS.STATE')} name='state' control={control}> */}
    //       <Flex flexDirection='row' flexWrap='wrap' maxW={`${maxWidth}px`} style={{ gap: 8 }}>
    //         <StateFilter state={PropState.PRODUCTION} />
    //         <StateFilter state={PropState.DESIGN} />
    //         <StateFilter state={PropState.MISSING_PIECES} />
    //         <StateFilter state={PropState.READY} />
    //         <StateFilter state={PropState.IN_PROGRESS} />
    //         <StateFilter state={PropState.DONE} />
    //         <StateFilter state={PropState.ON_SALE} />
    //         <StateFilter state={PropState.SOLD} />
    //       </Flex>
    //       {/* </FormControlWrapper> */}
    //     </Actionsheet.Item>
    //   </Actionsheet.Content>
    // </ActionsheetWrapper>
  );
};

export default PropFilters;
