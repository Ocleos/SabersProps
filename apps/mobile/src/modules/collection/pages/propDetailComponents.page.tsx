import { Button, Icon, VStack } from '@sabersprops/ui';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useMemo } from 'react';
import { View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import FilterSearchWrapper from '~src/components/list/filterSearchWrapper.component';
import PropComponentCard from '~src/modules/collection/components/propDetail/components/propComponentCard.component';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { appRoutes } from '~src/router/routes.utils';
import { onFilterComponents } from '../utils/props.utils';

const PropDetailComponents: React.FC = () => {
  const router = useRouter();

  const { propDetail, searchValue, setSearchValue, setSelectedComponent } = usePropDetailStore();

  const components = useMemo(() => onFilterComponents(propDetail?.components, searchValue), [propDetail, searchValue]);

  return (
    <>
      <VStack className='flex-1 gap-4'>
        <FilterSearchWrapper onSearchValue={setSearchValue} searchValue={searchValue} />

        <FlashList
          data={components}
          estimatedItemSize={150}
          ItemSeparatorComponent={() => <View className='h-4' />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          ListEmptyComponent={() => <EmptyComponent />}
          renderItem={({ item }) => <PropComponentCard propComponent={item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </VStack>

      <Button
        onPress={() => {
          setSelectedComponent(undefined);
          router.push(appRoutes.collection.components.form(propDetail?.id));
        }}
        size='fab'>
        <Icon as={PlusIcon} className='text-primary-foreground' />
      </Button>
    </>
  );
};

export default PropDetailComponents;
