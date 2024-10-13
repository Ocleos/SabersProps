import { type BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import useSWR from 'swr';
import { Button } from '~rnr/ui/button';
import { VStack } from '~rnr/ui/stack';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import BottomSheetWrapper from '~src/components/menu/bottomSheetWrapper.component';
import type { Prop } from '~src/models/prop.model';
import PropCardComponent from '~src/modules/collection/components/propList/propCard.component';
import PropFilters from '~src/modules/collection/components/propList/propFilters/propFilters.component';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import { appRoutes } from '~src/router/routes.utils';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';
import { PROPS_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';

const PropListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(PROPS_URL_ENDPOINT, getData<Prop>);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { props, filters, setSearchValue, updateProps, setSelectedProp } = useCollectionStore();

  useEffect(() => {
    if (data) {
      updateProps(data, filters);
    }
  }, [updateProps, data, filters]);

  return (
    <>
      <VStack className='flex-1 gap-4'>
        <FilterSearchWrapper
          onSearchValue={setSearchValue}
          searchValue={filters.searchValue}
          onOpenFilter={() => bottomSheetRef.current?.present()}
        />

        <FlashList
          data={props}
          renderItem={({ item }) => <PropCardComponent prop={item} />}
          estimatedItemSize={160}
          ListEmptyComponent={() => <EmptyComponent />}
          ItemSeparatorComponent={() => <View className='h-4' />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onRefresh={() => mutate()}
          refreshing={isLoading}
        />
      </VStack>

      <Button
        size='fab'
        onPress={() => {
          setSelectedProp(undefined);
          router.push(appRoutes.collection.form);
        }}>
        <PlusIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
      </Button>

      <BottomSheetWrapper ref={bottomSheetRef}>
        <BottomSheetView>
          <PropFilters />
        </BottomSheetView>
      </BottomSheetWrapper>
    </>
  );
};

export default PropListPage;
