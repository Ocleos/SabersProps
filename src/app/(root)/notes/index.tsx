import PageLayout from '@src/components/layout/pageLayout.component';
import NoteListPage from '@src/modules/notes/pages/noteList.page';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <PageLayout title={t('routing:ROUTING.NOTES.INITIAL')}>
      <NoteListPage />
    </PageLayout>
  );
};
