import PageLayout from '@src/components/layout/pageLayout.component';
import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.COLLECTION.COMPONENTS')} isScrollable={true}>
      <Text>Composants</Text>
    </PageLayout>
  );
};
