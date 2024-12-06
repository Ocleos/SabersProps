import { Button, DEFAULT_ICON_SIZE, VStack, colorsTheme } from '@sabersprops/ui';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import PropComponentCard from '~src/modules/collection/components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { appRoutes } from '~src/router/routes.utils';

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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </VStack>

      <Button
        size='fab'
        onPress={() => {
          setSelectedComponent(undefined);
          router.push(appRoutes.collection.components.form(propDetail?.id));
        }}>
        <PlusIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
      </Button>
    </>
  );
};

export default PropDetailComponents;
