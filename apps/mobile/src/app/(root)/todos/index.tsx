import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import Todos from '~src/modules/todos/page/todos.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout hasDrawerToggle={true} isScrollable={true} title={t('routing:ROUTING.TODOS.INITIAL')}>
      <Todos />
    </PageLayout>
  );
};
