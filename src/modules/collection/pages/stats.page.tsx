import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import { VStack } from '~src/components/ui/stack.component';
import ExpensesCard from '../components/stats/expenses/expensesCard.component';
import PricesCard from '../components/stats/prices/pricesCard.component';
import RepartitionCard from '../components/stats/repartition/repartitionCard.component';

const StatsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout isScrollable={true} title={t('collection:ROUTING.STATS')}>
      <VStack className='gap-4'>
        <RepartitionCard />
        <PricesCard />
        <ExpensesCard />
      </VStack>
    </PageLayout>
  );
};

export default StatsPage;
