import PageLayout from '@src/components/layout/pageLayout.component';
import PropFormComponent from '@src/modules/collection/propForm.component';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['collection']);
  const isEdit = false;

  const title = isEdit ? t('collection:FORM.EDIT_TITLE') : t('collection:FORM.ADD_TITLE');

  return (
    <PageLayout stackOptions={{ title }} isScrollable={true}>
      <PropFormComponent />
    </PageLayout>
  );
};
