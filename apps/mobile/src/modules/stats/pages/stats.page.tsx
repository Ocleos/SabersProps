import { VStack } from '@sabersprops/ui';
import ExpensesCard from '~src/modules/stats/components/expenses/expensesCard.component';
import PricesCard from '~src/modules/stats/components/prices/pricesCard.component';
import RepartitionCard from '~src/modules/stats/components/repartition/repartitionCard.component';

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
