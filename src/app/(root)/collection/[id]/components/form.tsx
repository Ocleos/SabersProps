import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import PropComponentForm from '~src/modules/collection/pages/propComponentForm.page';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';

export default () => {
  const { t } = useTranslation(['collection']);

  const { selectedComponent } = usePropDetailStore();
  const isEdit = selectedComponent != null;

  const title = isEdit ? t('collection:FORM.EDIT_COMPONENT') : t('collection:FORM.ADD_COMPONENT');

  return (
    <PageLayout title={title} isScrollable={true}>
      <PropComponentForm />
    </PageLayout>
  );
};
