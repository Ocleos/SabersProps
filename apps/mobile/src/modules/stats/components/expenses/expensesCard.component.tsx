import { Large, Skeleton, Tabs, TabsList, TabsTrigger, Text, VStack } from '@sabersprops/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import CollapseCard from '~src/components/card/collapseCard.component';
import type { Expense } from '~src/modules/stats/models/expense.model';
import { PROPS_EXPENSE_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import { ExpensesTypes, calculateExpenses } from './expenses.utils';
import ExpensesChart from './expensesChart.component';

const ExpensesCard = () => {
  const { t } = useTranslation(['stats']);

  const { data, isLoading } = useSWR(PROPS_EXPENSE_URL_ENDPOINT, getData<Expense>);

  const [expensesType, setExpensesType] = useState(ExpensesTypes.YEARS);

  const expenses = useMemo(() => (data ? calculateExpenses(data) : undefined), [data]);

  return (
    <CollapseCard title={t('stats:LABEL.EXPENSES')} isOpened={false}>
      {isLoading && (
        <VStack className='gap-4'>
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-12 w-full' />
        </VStack>
      )}
      {expenses && (
        <VStack className='gap-4'>
          <Tabs value={expensesType} onValueChange={(value) => setExpensesType(value as ExpensesTypes)}>
            <TabsList>
              <TabsTrigger value={ExpensesTypes.DAYS}>
                <Text>{t('stats:LABEL.EXPENSES_TABS.DAILY')}</Text>
              </TabsTrigger>
              <TabsTrigger value={ExpensesTypes.MONTHS}>
                <Text>{t('stats:LABEL.EXPENSES_TABS.MONTHLY')}</Text>
              </TabsTrigger>
              <TabsTrigger value={ExpensesTypes.YEARS}>
                <Text>{t('stats:LABEL.EXPENSES_TABS.YEARLY')}</Text>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <ExpensesChart data={expenses} type={expensesType} />

          <VStack className='gap-2'>
            <Large>{t('stats:LABEL.EXPENSES_TOTAL_MONTHLY')}</Large>
            <ExpensesChart data={expenses} type={ExpensesTypes.GLOBAL_MONTHS} />
          </VStack>
        </VStack>
      )}
    </CollapseCard>
  );
};

export default ExpensesCard;
