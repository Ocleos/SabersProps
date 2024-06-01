import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '~rnr/ui/button';
import { VStack } from '~rnr/ui/stack';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import { colorsTheme } from '~src/theme/nativewind.theme';
import PropComponentCard from '../components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '../stores/propDetail.store';

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
      <VStack className='flex-1 gap-4'>
        <FilterSearchWrapper onSearchValue={setSearchValue} searchValue={searchValue} />

        <FlashList
          data={components}
          renderItem={({ item }) => <PropComponentCard propComponent={item} />}
          estimatedItemSize={150}
          ListEmptyComponent={() => <EmptyComponent />}
          ItemSeparatorComponent={() => <View className='h-4' />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
        />
      </VStack>

      <Button
        size='fab'
        onPress={() => {
          setSelectedComponent(undefined);
          router.push(`/collection/${propDetail?.id}/components/form`);
        }}>
        <Plus color={colorsTheme.textForeground} />
      </Button>
    </>
  );
};

export default PropDetailComponents;
