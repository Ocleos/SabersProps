import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.STATS.INITIAL')}>
      <Text>Stats Page</Text>
    </PageLayout>
  );
};
