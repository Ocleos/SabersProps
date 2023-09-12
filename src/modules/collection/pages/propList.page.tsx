import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Fab, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import useSWR from 'swr';
import ActionsMenu from '~src/components/actionSheet/actionsMenu.component';
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

  const {
    props,
    filters,
    selectedProp,
    isActionsOpen,
    setIsActionsOpen,
    setSearchValue,
    updateProps,
    setIsFiltersOpen,
    setSelectedProp,
  } = useCollectionStore();

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
        icon={<Icon as={Plus} size='lg' />}
      />

      <PropFilters />

      <ActionsMenu
        idSelected={selectedProp?.id}
        nameSelected={selectedProp?.name}
        routeEdit='/collection/form'
        isOpen={isActionsOpen}
        setIsOpen={setIsActionsOpen}
        setSelected={setSelectedProp}
        urlEndpoint={PROPS_URL_ENDPOINT}
      />
    </>
  );
};

export default PropListPage;
