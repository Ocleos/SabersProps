import { Box, Fab, FabIcon, VStack } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useEffect } from 'react';
import useSWR from 'swr';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import { Prop } from '~src/models/prop.model';
import { PROPS_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import PropCardComponent from '../components/propList/propCard.component';
import PropFilters from '../components/propList/propFilters/propFilters.component';
import { useCollectionStore } from '../store/collection.store';

const PropListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(PROPS_URL_ENDPOINT, getData<Prop>);

  const { props, filters, setSearchValue, updateProps, setIsFiltersOpen, setSelectedProp } = useCollectionStore();

  useEffect(() => {
    if (data) {
      updateProps(data, filters);
    }
  }, [updateProps, data, filters]);

  return (
    <>
      <VStack flex={1} gap={'$4'}>
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
          ItemSeparatorComponent={() => <Box h={'$4'} />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onRefresh={() => mutate()}
          refreshing={isLoading}
        />
      </VStack>

      <Fab
        size='lg'
        onPress={() => {
          setSelectedProp(undefined);
          router.push('/collection/form');
        }}
      >
        <FabIcon as={Plus} size='xl' />
      </Fab>

      <PropFilters />
    </>
  );
};

export default PropListPage;
