import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Skeleton } from '~rnr/ui/skeleton';
import { VStack } from '~rnr/ui/stack';
import InformationsCard from '~src/modules/collection/components/propDetail/informations/informationsCard.component';
import PricesCard from '~src/modules/collection/components/propDetail/informations/pricesCard.component';
import StatusDetail from '~src/modules/collection/components/propDetail/informations/statusDetail.component';
import { getPropDetail } from '~src/modules/collection/services/props.api';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { PROPS_URL_ENDPOINT } from '~src/utils/supabase.utils';

const PropDetailInformations: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: propDetail, isLoading } = useSWR(id ? [PROPS_URL_ENDPOINT, id] : null, ([url, id]) =>
    getPropDetail(url, id),
  );

  const { updatePropDetail } = usePropDetailStore();

  useEffect(() => {
    updatePropDetail(propDetail);
  }, [updatePropDetail, propDetail]);

  return isLoading ? (
    <VStack className='gap-4'>
      <Skeleton className='h-12 w-full' />
      <Skeleton className='h-12 w-full' />
      <Skeleton className='h-12 w-full' />
    </VStack>
  ) : (
    propDetail && (
      <VStack className='gap-4'>
        <StatusDetail prop={propDetail} />
        <InformationsCard prop={propDetail} />
        <PricesCard prop={propDetail} />
      </VStack>
    )
  );
};

export default PropDetailInformations;
