import { type BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { Button, DEFAULT_ICON_SIZE, VStack, colorsTheme } from '@sabersprops/ui';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useRef } from 'react';
import { View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import BottomSheetWrapper from '~src/components/menu/bottomSheetWrapper.component';
import type { Prop } from '~src/models/prop.model';
import PropCardComponent from '~src/modules/collection/components/propList/propCard.component';
import PropFilters from '~src/modules/collection/components/propList/propFilters/propFilters.component';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import { appRoutes } from '~src/router/routes.utils';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE, getData } from '~src/utils/supabase.utils';
import { onFilterProps } from '../utils/props.utils';

const PropListPage: React.FC = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { filters, setSearchValue, setSelectedProp } = useCollectionStore();

  const { isLoading, data, refetch } = useQuery({
    queryKey: propsKeys.root(),
    queryFn: async () => await getData<Prop>(PROPS_TABLE),
    subscribed: isFocused,
    select: (data) => onFilterProps(data, filters),
  });

  return (
    <>
      <VStack className='flex-1 gap-4'>
        <FilterSearchWrapper
          onSearchValue={setSearchValue}
          searchValue={filters.searchValue}
          onOpenFilter={() => bottomSheetRef.current?.present()}
        />

        <FlashList
          data={data}
          renderItem={({ item }) => <PropCardComponent prop={item} />}
          estimatedItemSize={160}
          ListEmptyComponent={() => <EmptyComponent />}
          ItemSeparatorComponent={() => <View className='h-4' />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onRefresh={() => refetch()}
          refreshing={isLoading}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
