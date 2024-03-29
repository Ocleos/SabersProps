import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import AurebeshTranslator from '~src/modules/tools/pages/aurebeshTranslator.page';

export default () => {
  const { t } = useTranslation(['tools']);

  return (
    <PageLayout title={t('tools:TOOLS.TRANSLATOR.TITLE')} isScrollable={true}>
      <AurebeshTranslator />
    </PageLayout>
  );
};
