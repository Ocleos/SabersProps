import { Spinner, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { PROPS_URL_ENDPOINT } from '~src/utils/supabase.utils';
import InformationsCard from '../components/propDetail/informations/informationsCard.component';
import PricesCard from '../components/propDetail/informations/pricesCard.component';
import StatusDetail from '../components/propDetail/informations/statusDetail.component';
import { getPropDetail } from '../services/props.api';
import { usePropDetailStore } from '../store/propDetail.store';

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
    <Spinner />
  ) : (
    propDetail && (
      <VStack gap={'$4'}>
        <StatusDetail prop={propDetail} />
        <InformationsCard prop={propDetail} />
        <PricesCard prop={propDetail} />
      </VStack>
    )
  );
};

export default PropDetailInformations;
