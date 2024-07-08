import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import PropFormPage from '~src/modules/collection/pages/propForm.page';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';

export default () => {
  const { t } = useTranslation(['collection']);

  const { selectedProp } = useCollectionStore();
  const isEdit = selectedProp != null;

  const title = isEdit ? t('collection:FORM.EDIT') : t('collection:FORM.ADD');

  return (
    <PageLayout title={title} isScrollable={true}>
      <PropFormPage />
    </PageLayout>
  );
};
