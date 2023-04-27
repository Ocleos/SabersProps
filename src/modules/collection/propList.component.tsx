import PropActionSheet from './propActionSheet.component';
import PropCardComponent from './propCard.component';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import { getProps, propsUrlEndpoint } from '@src/services/props.api';
import { useToken } from 'native-base';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

const PropListComponent: React.FC = () => {
  const { t } = useTranslation('common');

  const {
    isLoading,
    data: props,
    mutate,
  } = useSWR(propsUrlEndpoint, getProps, {
    onSuccess: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
  });

  return (
    <>
      <FlashList
        data={props}
        renderItem={({ item }) => <PropCardComponent prop={item} />}
        estimatedItemSize={useToken('sizes', 40)}
        ListEmptyComponent={() => <EmptyComponent title={t('common:COMMON.NO_DATA')} />}
        keyExtractor={(item) => item._id}
        onRefresh={() => mutate()}
        refreshing={isLoading}
      />

      <PropActionSheet />
    </>
  );
};

export default PropListComponent;
