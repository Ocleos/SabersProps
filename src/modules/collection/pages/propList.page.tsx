import { type BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { useIsFocused, useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import type React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '~src/components/error/error.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import FlashListWrapper from '~src/components/list/flashListWrapper.component';
import BottomSheetWrapper from '~src/components/menu/bottomSheetWrapper.component';
import FabButton from '~src/components/ui/fabButton.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_TABLE } from '~src/utils/supabase.utils';
import PropCard from '../components/propList/propCard.component';
import PropFilters from '../components/propList/propFilters.component';
import { useCollectionStore } from '../stores/collection.store';
import type { Prop } from '../types/prop.type';
import { onFilterProps } from '../utils/props.utils';

const PropListPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isFocused = useIsFocused();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { filters, setSelectedProp, setSearchValue } = useCollectionStore();

  const { isError, isLoading, data, refetch } = useQuery({
    queryFn: async () => await getData<Prop>(PROPS_TABLE),
    queryKey: propsKeys.root(),
    select: (data) => onFilterProps(data, filters),
    subscribed: isFocused,
  });

  return (
    <PageLayout isScrollable={false} title={t('collection:ROUTING.COLLECTION')}>
      <VStack className='flex-1 gap-4'>
        <FilterSearchWrapper
          onOpenFilter={() => bottomSheetRef.current?.present()}
          onSearchValue={setSearchValue}
          searchValue={filters.searchValue}
        />

        {isError ? (
          <ErrorComponent onRetry={() => refetch()} />
        ) : (
          <FlashListWrapper
            data={data}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            onRefresh={() => refetch()}
            refreshing={isLoading}
            renderItem={({ item }) => <PropCard prop={item} />}
          />
        )}
      </VStack>

      <FabButton
        onPress={() => {
          setSelectedProp(undefined);
          router.push('/(root)/collection/formProp');
        }}>
        <Icon as={PlusIcon} className='text-accent-foreground' />
      </FabButton>

      <BottomSheetWrapper ref={bottomSheetRef}>
        <BottomSheetView style={{ alignItems: 'center', flex: 1 }}>
          <PropFilters />
        </BottomSheetView>
      </BottomSheetWrapper>
    </PageLayout>
  );
};

export default PropListPage;
