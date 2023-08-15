import PageLayout from '@src/components/layout/pageLayout.component';
import ToolsPage from '@src/modules/tools/pages/tools.page';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.TOOLS.INITIAL')}>
      <ToolsPage />
    </PageLayout>
  );
};
