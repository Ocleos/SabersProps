import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import ToolsPage from '~src/modules/tools/pages/tools.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.TOOLS.INITIAL')}>
      <ToolsPage />
    </PageLayout>
  );
};
