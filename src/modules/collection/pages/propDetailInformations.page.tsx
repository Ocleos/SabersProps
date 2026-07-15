import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import EmptyComponent from '~src/components/empty/empty.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import AccessoriesCard from '../components/propDetail/informations/accessoriesCard.component';
import ComponentCard from '../components/propDetail/informations/componentCard.component';
import InformationsCard from '../components/propDetail/informations/informationsCard.component';
import PricesCard from '../components/propDetail/informations/pricesCard.component';
import StatusDetail from '../components/propDetail/informations/statusDetail.component';
import { getPropDetail } from '../services/props.api';
import { usePropDetailStore } from '../stores/propDetail.store';

const PropDetailInformationsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { updatePropDetail } = usePropDetailStore();

  const { data: propDetail, isLoading } = useQuery({
    queryFn: async () => {
      const data = await getPropDetail(id);
      updatePropDetail(data ?? undefined);
      return data;
    },
    queryKey: propsKeys.detail(id),
  });

  return (
    <PageLayout isScrollable={true} title={propDetail?.name ?? ''}>
      {!isLoading && !propDetail ? (
        <EmptyComponent />
      ) : (
        <VStack className='gap-4'>
          <StatusDetail isLoading={isLoading} prop={propDetail ?? undefined} />
          <InformationsCard isLoading={isLoading} prop={propDetail ?? undefined} />
          <ComponentCard isLoading={isLoading} prop={propDetail ?? undefined} />
          <AccessoriesCard isLoading={isLoading} prop={propDetail ?? undefined} />
          <PricesCard isLoading={isLoading} prop={propDetail ?? undefined} />
        </VStack>
      )}
    </PageLayout>
  );
};

export default PropDetailInformationsPage;
