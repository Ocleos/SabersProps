import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import PropListPage from '~src/modules/collection/pages/propList.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout hasDrawerToggle={true} title={t('routing:ROUTING.COLLECTION.INITIAL')}>
      <PropListPage />
    </PageLayout>
  );
};
