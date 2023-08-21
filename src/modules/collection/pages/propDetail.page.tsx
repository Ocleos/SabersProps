import InformationsCard from '../components/propDetail/informationsCard.component';
import PricesCard from '../components/propDetail/pricesCard.component';
import { getPropDetail } from '../services/props.api';
import { PROPS_URL_ENDPOINT } from '@src/utils/supabase.utils';
import { useLocalSearchParams } from 'expo-router';
import { Heading, Spinner, VStack } from 'native-base';
import useSWR from 'swr';

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

        <InformationsCard prop={propDetail} />

        <PricesCard prop={propDetail} />
      </VStack>
    )
  );
};

export default PropDetailPage;
