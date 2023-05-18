import { AntDesign } from '@expo/vector-icons';
import PageLayout from '@src/components/layout/pageLayout.component';
import PropListComponent from '@src/modules/collection/propList.component';
import { useCollectionStore } from '@src/store/collection.store';
import { useRouter } from 'expo-router';
import { Fab, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);
  const router = useRouter();

  const { setSelectedProp } = useCollectionStore();

  return (
    <PageLayout
      stackOptions={{
        title: t('routing:ROUTING.COLLECTION.INITIAL') ?? '',
      }}
    >
      <PropListComponent />
      <Fab
        renderInPortal={false}
        placement={'bottom-right'}
        onPress={() => {
          setSelectedProp(undefined);
          router.push('/collection/form');
        }}
        shadow={9}
        icon={<Icon as={AntDesign} name='plus' size='lg' />}
      />
    </PageLayout>
  );
};
