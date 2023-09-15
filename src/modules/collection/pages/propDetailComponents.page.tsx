import { Box, Fab, FabIcon, VStack } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Plus } from 'lucide-react-native';
import { useEffect } from 'react';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import PropComponentCard from '../components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '../store/propDetail.store';

const PropDetailComponents: React.FC = () => {
  const router = useRouter();

  const { propDetail, components, searchValue, updateComponents, setSearchValue, setSelectedComponent } =
    usePropDetailStore();

  useEffect(() => {
    if (propDetail) {
      updateComponents(propDetail.components, searchValue);
    }
  }, [updateComponents, propDetail, searchValue]);

  return (
    <>
      <VStack flex={1} gap={'$4'}>
        <FilterSearchWrapper onSearchValue={setSearchValue} searchValue={searchValue} />

        <FlashList
          data={components}
          renderItem={({ item }) => <PropComponentCard propComponent={item} />}
          estimatedItemSize={150}
          ListEmptyComponent={() => <EmptyComponent />}
          ItemSeparatorComponent={() => <Box h={'$4'} />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
        />
      </VStack>

      <Fab
        size='lg'
        disabled={isNil(propDetail)}
        onPress={() => {
          setSelectedComponent(undefined);
          router.push(`/collection/${propDetail?.id}/components/form`);
        }}
      >
        <FabIcon as={Plus} size='xl' />
      </Fab>
    </>
  );
};

export default PropDetailComponents;
