import { VStack } from '~ui/stack';
import PricesCard from '../components/prices/pricesCard.component';
import RepartitionCard from '../components/repartition/repartitionCard.component';

const Stats: React.FC = () => {
  return (
    <VStack className='gap-4'>
      <RepartitionCard />
      <PricesCard />
    </VStack>
  );
};

export default Stats;
