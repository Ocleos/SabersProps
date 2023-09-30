import { VStack } from '@gluestack-ui/themed';
import RepartitionCard from '../components/repartition/repartitionCard.component';

const Stats: React.FC = () => {
  return (
    <VStack gap={'$4'}>
      <RepartitionCard />
    </VStack>
  );
};

export default Stats;
