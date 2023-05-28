import PropActions from './propActions.component';
import PropCardComponent from './propCard.component';
import PropFilters from './propFilters.component';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import FilterSearchWrapper from '@src/components/list/filterSearchWrapper.component';
import { getProps, propsUrlEndpoint } from '@src/services/props.api';
import { useCollectionStore } from '@src/store/collection.store';
import { VStack } from 'native-base';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

const PropListComponent: React.FC = () => {
  const { t } = useTranslation('common');

  const { isLoading, data, mutate } = useSWR(propsUrlEndpoint, getProps);

  const { props, filters, setSearchValue, updateProps, setIsFiltersOpen } = useCollectionStore();

  useEffect(() => {
    if (data) {
      updateProps(data);
    }
  }, [data, filters]);

  return (
    <VStack space={2}>
      <FilterSearchWrapper
        onSearchValue={setSearchValue}
        searchValue={filters.searchValue}
        onOpenFilter={setIsFiltersOpen}
      />

      <FlashList
        data={props}
        renderItem={({ item }) => <PropCardComponent prop={item} />}
        estimatedItemSize={160}
        ListEmptyComponent={() => <EmptyComponent title={t('common:COMMON.NO_DATA')} />}
        keyExtractor={(item) => item._id}
        onRefresh={() => mutate()}
        refreshing={isLoading}
      />

      <PropFilters />
      <PropActions />
    </VStack>
  );
};

export default PropListComponent;
