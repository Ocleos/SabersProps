import PageLayout from '@src/components/layout/pageLayout.component';
import PropFormComponent from '@src/modules/collection/propForm.component';
import { useCollectionStore } from '@src/store/collection.store';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['collection']);

  const { selectedProp } = useCollectionStore();
  const isEdit = !isNil(selectedProp);

  const title = isEdit ? t('collection:FORM.EDIT_TITLE') : t('collection:FORM.ADD_TITLE');

  return (
    <PageLayout stackOptions={{ title }} isScrollable={true}>
      <PropFormComponent />
    </PageLayout>
  );
};
