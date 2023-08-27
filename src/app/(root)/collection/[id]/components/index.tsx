import PageLayout from '@src/components/layout/pageLayout.component';
import PropDetailComponents from '@src/modules/collection/pages/propDetailComponents.page';
import { usePropDetailStore } from '@src/modules/collection/store/propDetail.store';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  const { propDetail } = usePropDetailStore();
  const title = `${propDetail?.name ?? ''} - ${t('routing:ROUTING.COLLECTION.COMPONENTS')}`;

  return (
    <PageLayout title={title}>
      <PropDetailComponents />
    </PageLayout>
  );
};
