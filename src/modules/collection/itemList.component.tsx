import ItemCardComponent from './itemCard.component';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import { useCollectionStore } from '@src/store/collection.store';
import { isPending } from '@src/utils/status.utils';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ItemListComponent: React.FC = () => {
  const { t } = useTranslation('common');

  const { collection, status, fetchCollection } = useCollectionStore();

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <FlashList
      data={collection}
      renderItem={({ item }) => <ItemCardComponent item={item} />}
      estimatedItemSize={160}
      ListEmptyComponent={() => <EmptyComponent title={t('common:COMMON.NO_DATA')} />}
      keyExtractor={(item) => item.id}
      onRefresh={() => fetchCollection()}
      refreshing={isPending(status)}
    />
  );
};

export default ItemListComponent;
