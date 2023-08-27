import PageLayout from '@src/components/layout/pageLayout.component';
import PropDetailInformations from '@src/modules/collection/pages/propDetailInformations.page';
import { usePropDetailStore } from '@src/modules/collection/store/propDetail.store';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  const { propDetail } = usePropDetailStore();
  const title = propDetail?.name ?? t('routing:ROUTING.COLLECTION.INFORMATIONS');

  return (
    <PageLayout title={title} isScrollable={true}>
      <PropDetailInformations />
    </PageLayout>
  );
};
