import { FlashList, type FlashListProps } from '@shopify/flash-list';
import { View } from 'react-native';
import EmptyComponent from '../empty/empty.component';

const FlashListWrapper = <T,>(props: FlashListProps<T>) => {
  return (
    <FlashList
      ItemSeparatorComponent={() => <View className='h-4' />}
      ListEmptyComponent={() => <EmptyComponent />}
      ListFooterComponent={() => <View className='h-24' />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};

export default FlashListWrapper;
