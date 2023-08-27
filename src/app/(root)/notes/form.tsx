import PageLayout from '@src/components/layout/pageLayout.component';
import NoteFormPage from '@src/modules/notes/pages/noteForm.page';
import { useNotesStore } from '@src/modules/notes/store/notes.store';
import { isNil } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['notes']);

  const { selectedNote } = useNotesStore();
  const isEdit = !isNil(selectedNote);

  const title = isEdit ? t('notes:FORM.EDIT_TITLE') : t('notes:FORM.ADD_TITLE');

  return (
    <PageLayout title={title} isScrollable={true}>
      <NoteFormPage />
    </PageLayout>
  );
};