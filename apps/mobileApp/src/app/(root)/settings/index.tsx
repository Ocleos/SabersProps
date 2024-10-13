import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import SettingsPage from '~src/modules/settings/pages/settings.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.SETTINGS.INITIAL')} hasDrawerToggle={true}>
      <SettingsPage />
    </PageLayout>
  );
};
