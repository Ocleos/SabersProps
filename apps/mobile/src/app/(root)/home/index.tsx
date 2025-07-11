import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import HomePage from '~src/modules/home/pages/home.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout hasDrawerToggle={true} title={t('routing:ROUTING.HOME.INITIAL')}>
      <HomePage />
    </PageLayout>
  );
};
