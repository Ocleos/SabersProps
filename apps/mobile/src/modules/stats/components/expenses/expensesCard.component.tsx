import { useIsFocused } from '@react-navigation/native';
import { Large, Skeleton, Tabs, TabsList, TabsTrigger, Text, VStack } from '@sabersprops/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_EXPENSE_TABLE, getData } from '~src/utils/supabase.utils';
import type { Expense } from '../../models/expense.model';
import { ExpensesTypes, calculateExpenses } from './expenses.utils';
import ExpensesChart from './expensesChart.component';

const ExpensesCard = () => {
  const { t } = useTranslation(['stats']);
  const isFocused = useIsFocused();

  const { data: expenses, isLoading } = useQuery({
    queryKey: propsKeys.statsExpenses(),
    queryFn: async () => await getData<Expense>(PROPS_EXPENSE_TABLE),
    subscribed: isFocused,
    select: (data) => calculateExpenses(data),
  });

  const [expensesType, setExpensesType] = useState(ExpensesTypes.YEARS);

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
