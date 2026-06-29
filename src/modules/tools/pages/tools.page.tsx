import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import { VStack } from '~src/components/ui/stack.component';
import AurebeshTranslator from '../components/aurebeshTranslator.component';

const ToolsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout isScrollable={true} title={t('tools:ROUTING.TITLE')}>
      <VStack className='gap-4'>
        <AurebeshTranslator />
      </VStack>
    </PageLayout>
  );
};

export default ToolsPage;
