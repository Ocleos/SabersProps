import PropActions from '../components/propList/propActions.component';
import PropCardComponent from '../components/propList/propCard.component';
import PropFilters from '../components/propList/propFilters/propFilters.component';
import { useCollectionStore } from '../store/collection.store';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import FilterSearchWrapper from '@src/components/list/filterSearchWrapper.component';
import { Prop } from '@src/models/prop.model';
import { PROPS_URL_ENDPOINT, getData } from '@src/utils/supabase.utils';
import { useRouter } from 'expo-router';
import { Fab, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import useSWR from 'swr';

const PropListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(PROPS_URL_ENDPOINT, getData<Prop>);

  const { props, filters, setSearchValue, updateProps, setIsFiltersOpen, setSelectedProp } = useCollectionStore();

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

      <Fab
        renderInPortal={false}
        placement={'bottom-right'}
        onPress={() => {
          setSelectedProp(undefined);
          router.push('/collection/form');
        }}
        shadow={9}
        icon={<Icon as={AntDesign} name='plus' size='lg' />}
      />

      <PropFilters />
      <PropActions />
    </>
  );
};

export default PropListPage;
