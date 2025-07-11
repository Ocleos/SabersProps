import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import NoteFormPage from '~src/modules/notes/pages/noteForm.page';
import { useNotesStore } from '~src/modules/notes/stores/notes.store';

export default () => {
  const { t } = useTranslation(['notes']);

  const { selectedNote } = useNotesStore();
  const isEdit = selectedNote != null;

  const title = isEdit ? t('notes:FORM.EDIT_TITLE') : t('notes:FORM.ADD_TITLE');

  return (
    <PageLayout isScrollable={true} title={title}>
      <NoteFormPage />
    </PageLayout>
  );
};
