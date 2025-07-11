import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import NoteListPage from '~src/modules/notes/pages/noteList.page';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout hasDrawerToggle={true} title={t('routing:ROUTING.NOTES.INITIAL')}>
      <NoteListPage />
    </PageLayout>
  );
};
