import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import AurebeshTranslator from '~src/modules/tools/pages/aurebeshTranslator.page';

export default () => {
  const { t } = useTranslation(['tools']);

  return (
    <PageLayout isScrollable={true} title={t('tools:TOOLS.TRANSLATOR.TITLE')}>
      <AurebeshTranslator />
    </PageLayout>
  );
};
