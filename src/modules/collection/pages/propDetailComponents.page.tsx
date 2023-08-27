import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import FilterSearchWrapper from '@src/components/list/filterSearchWrapper.component';
import { useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Fab, Icon, VStack } from 'native-base';
import { useEffect } from 'react';
import PropComponentActions from '../components/propDetail/components/propComponentActions.component';
import PropComponentCard from '../components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '../store/propDetail.store';

const PropDetailComponents: React.FC = () => {
  const router = useRouter();

  const { propDetail, components, searchValue, updateComponents, setSearchValue, setSelectedComponent } =
    usePropDetailStore();

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
        icon={<Icon as={AntDesign} name='plus' size='lg' />}
      />

      <PropComponentActions />
    </>
  );
};

export default PropDetailComponents;
