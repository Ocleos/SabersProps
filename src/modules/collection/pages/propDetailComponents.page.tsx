import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Plus } from 'lucide-react-native';
import { Fab, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import ActionsMenu from '~src/components/actionSheet/actionsMenu.component';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT } from '~src/utils/supabase.utils';
import PropComponentCard from '../components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '../store/propDetail.store';

const PropDetailComponents: React.FC = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const {
    propDetail,
    components,
    searchValue,
    selectedComponent,
    updateComponents,
    setSearchValue,
    setSelectedComponent,
    isActionsOpen,
    setIsActionsOpen,
  } = usePropDetailStore();

  useEffect(() => {
    if (propDetail) {
      updateComponents(propDetail.components);
    }
  }, [propDetail, searchValue]);

  return (
    <>
      <VStack space={2} flex={1}>
        <FilterSearchWrapper onSearchValue={setSearchValue} searchValue={searchValue} />

        <FlashList
          data={components}
          renderItem={({ item }) => <PropComponentCard propComponent={item} />}
          estimatedItemSize={150}
          ListEmptyComponent={() => <EmptyComponent />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
        />
      </VStack>

      <Fab
        renderInPortal={false}
        placement={'bottom-right'}
        disabled={isNil(propDetail)}
        onPress={() => {
          setSelectedComponent(undefined);
          router.push(`/collection/${propDetail?.id}/components/form`);
        }}
        shadow={9}
        icon={<Icon as={Plus} size='lg' />}
      />

      <ActionsMenu
        idSelected={selectedComponent?.id}
        nameSelected={selectedComponent?.label}
        routeEdit={`/collection/${selectedComponent?.idProp}/components/form`}
        isOpen={isActionsOpen}
        setIsOpen={setIsActionsOpen}
        setSelected={setSelectedComponent}
        urlEndpoint={COMPONENTS_URL_ENDPOINT}
        onDeleteCallback={() => mutate([PROPS_URL_ENDPOINT, selectedComponent?.idProp])}
      />
    </>
  );
};

export default PropDetailComponents;
