import { PROPS_URL_ENDPOINT } from '@src/utils/supabase.utils';
import { useLocalSearchParams } from 'expo-router';
import { Heading, Spinner, VStack } from 'native-base';
import useSWR from 'swr';
import InformationsCard from '../components/propDetail/informationsCard.component';
import PricesCard from '../components/propDetail/pricesCard.component';
import StatusDetail from '../components/propDetail/statusDetail.component';
import { getPropDetail } from '../services/props.api';

const PropDetailPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: propDetail, isLoading } = useSWR(id ? [PROPS_URL_ENDPOINT, id] : null, ([url, id]) =>
    getPropDetail(url, id),
  );

  return isLoading ? (
    <Spinner />
  ) : (
    propDetail && (
      <VStack space={4}>
        <Heading w={'full'} textAlign={'center'} size={'xl'}>
          {propDetail.name}
        </Heading>

        <StatusDetail prop={propDetail} />

        <InformationsCard prop={propDetail} />

        <PricesCard prop={propDetail} />
      </VStack>
    )
  );
};

export default PropDetailPage;
