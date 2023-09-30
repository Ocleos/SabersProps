import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import Stats from '~src/modules/stats/pages/stats.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.STATS.INITIAL')} hasDrawerToggle={true} isScrollable={true}>
      <Stats />
    </PageLayout>
  );
};
