import PropCardComponent from './propCard.component';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import { useCollectionStore } from '@src/store/collection.store';
import { isPending } from '@src/utils/status.utils';
import { useToken } from 'native-base';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PropListComponent: React.FC = () => {
  const { t } = useTranslation('common');

  const { props, status, fetchProps } = useCollectionStore();

  useEffect(() => {
    fetchProps();
  }, []);

  return (
    <FlashList
      data={props}
      renderItem={({ item }) => <PropCardComponent prop={item} />}
      estimatedItemSize={useToken('sizes', 40)}
      ListEmptyComponent={() => <EmptyComponent title={t('common:COMMON.NO_DATA')} />}
      keyExtractor={(item) => item.id}
      onRefresh={() => fetchProps()}
      refreshing={isPending(status)}
    />
  );
};

export default PropListComponent;
