import { VStack } from '@gluestack-ui/themed';
import PricesCard from '../components/prices/pricesCard.component';
import RepartitionCard from '../components/repartition/repartitionCard.component';

const Stats: React.FC = () => {
  return (
    <VStack gap={'$4'}>
      <RepartitionCard />
      <PricesCard />
    </VStack>
  );
};

export default Stats;
