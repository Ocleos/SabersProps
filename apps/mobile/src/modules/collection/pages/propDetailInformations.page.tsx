import { Skeleton, VStack } from '@sabersprops/ui';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import InformationsCard from '~src/modules/collection/components/propDetail/informations/informationsCard.component';
import PricesCard from '~src/modules/collection/components/propDetail/informations/pricesCard.component';
import StatusDetail from '~src/modules/collection/components/propDetail/informations/statusDetail.component';
import { getPropDetail } from '~src/modules/collection/services/props.api';
import { propsKeys } from '~src/utils/queryKeys.utils';
import AccessoriesCard from '../components/propDetail/informations/accessoriesCard.components';
import { usePropDetailStore } from '../stores/propDetail.store';

const PropDetailInformations = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { updatePropDetail } = usePropDetailStore();

  const { data: propDetail, isLoading } = useQuery({
    queryKey: propsKeys.detail(id),
    queryFn: async () => await getPropDetail(id),
  });

  useEffect(() => {
    updatePropDetail(propDetail);
  }, [updatePropDetail, propDetail]);

  return isLoading ? (
    <VStack className='gap-4'>
      <Skeleton className='h-12 w-full' />
      <Skeleton className='h-12 w-full' />
      <Skeleton className='h-12 w-full' />
      <Skeleton className='h-12 w-full' />
    </VStack>
  ) : (
    propDetail && (
      <VStack className='gap-4'>
        <StatusDetail prop={propDetail} />
        <InformationsCard prop={propDetail} />
        <AccessoriesCard prop={propDetail} />
        <PricesCard prop={propDetail} />
      </VStack>
    )
  );
};

export default PropDetailInformations;
