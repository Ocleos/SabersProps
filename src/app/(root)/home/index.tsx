import { Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.HOME.INITIAL')} hasDrawerToggle={true}>
      <Text>{t('routing:ROUTING.HOME.INITIAL')}</Text>
    </PageLayout>
  );
};
