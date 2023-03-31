import PageLayout from '@src/components/layout/pageLayout.component';
import AurebeshTranslator from '@src/modules/tools/aurebeshTranslator/aurebeshTranslator.component';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout stackOptions={{ title: t('routing:ROUTING.TOOLS.INITIAL') ?? '' }}>
      <AurebeshTranslator />
    </PageLayout>
  );
};
