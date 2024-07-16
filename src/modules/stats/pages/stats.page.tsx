import { VStack } from '~rnr/ui/stack';
import ExpensesCard from '../components/expenses/expensesCard.component';
import PricesCard from '../components/prices/pricesCard.component';
import RepartitionCard from '../components/repartition/repartitionCard.component';

const Stats: React.FC = () => {
  return (
    <VStack className='gap-4'>
      <RepartitionCard />
      <PricesCard />
      <ExpensesCard />
    </VStack>
  );
};

export default Stats;
