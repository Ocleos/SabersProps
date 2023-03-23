import { AntDesign } from '@expo/vector-icons';
import PageLayout from '@src/components/layout/pageLayout.component';
import ItemListComponent from '@src/modules/collection/itemList.component';
import { useRouter } from 'expo-router';
import { Fab, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);
  const router = useRouter();

  return (
    <PageLayout stackOptions={{ title: t('routing:ROUTING.COLLECTION.INITIAL') ?? '' }}>
      <ItemListComponent />
      <Fab
        renderInPortal={false}
        placement={'bottom-right'}
        onPress={() => router.push('/collection/form')}
        shadow={9}
        icon={<Icon as={AntDesign} name="plus" size="lg" />}
      />
    </PageLayout>
  );
};
