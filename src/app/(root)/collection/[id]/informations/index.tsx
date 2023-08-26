import PageLayout from '@src/components/layout/pageLayout.component';
import PropDetailPage from '@src/modules/collection/pages/propDetail.page';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.COLLECTION.INFORMATIONS')} isScrollable={true}>
      <PropDetailPage />
    </PageLayout>
  );
};
