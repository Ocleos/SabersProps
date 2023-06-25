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
import useSWR from 'swr';

const PropListComponent: React.FC = () => {
  const { isLoading, data, mutate } = useSWR(propsUrlEndpoint, getProps);

  const { props, filters, setSearchValue, updateProps, setIsFiltersOpen } = useCollectionStore();

  useEffect(() => {
    if (data) {
      updateProps(data);
    }
  }, [data, filters]);

  return (
    <>
      <VStack space={2} flex={1}>
        <FilterSearchWrapper
          onSearchValue={setSearchValue}
          searchValue={filters.searchValue}
          onOpenFilter={setIsFiltersOpen}
        />

        <FlashList
          data={props}
          renderItem={({ item }) => <PropCardComponent prop={item} />}
          estimatedItemSize={160}
          ListEmptyComponent={() => <EmptyComponent />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onRefresh={() => mutate()}
          refreshing={isLoading}
        />
      </VStack>

      <PropFilters />
      <PropActions />
    </>
  );
};

export default PropListComponent;
