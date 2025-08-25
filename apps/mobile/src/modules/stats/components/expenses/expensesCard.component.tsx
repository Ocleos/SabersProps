import { useIsFocused } from '@react-navigation/native';
import { Skeleton, Tabs, TabsList, TabsTrigger, Text, VStack } from '@sabersprops/ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_EXPENSE_TABLE } from '~src/utils/supabase.utils';
import type { Expense } from '../../models/expense.model';
import { calculateExpenses, ExpensesTypes } from './expenses.utils';
import ExpensesChart from './expensesChart.component';

const ExpensesCard = () => {
  const { t } = useTranslation(['stats']);
  const isFocused = useIsFocused();

  const { data: expenses, isLoading } = useQuery({
    queryFn: async () => await getData<Expense>(PROPS_EXPENSE_TABLE),
    queryKey: propsKeys.statsExpenses(),
    select: (data) => calculateExpenses(data),
    subscribed: isFocused,
  });

  const [expensesType, setExpensesType] = useState(ExpensesTypes.YEARS);

  return (
    <CollapseCard isOpened={false} title={t('stats:LABEL.EXPENSES')}>
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
          <Tabs onValueChange={(value) => setExpensesType(value as ExpensesTypes)} value={expensesType}>
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
            <Text variant='large'>{t('stats:LABEL.EXPENSES_TOTAL_MONTHLY')}</Text>
            <ExpensesChart data={expenses} type={ExpensesTypes.GLOBAL_MONTHS} />
          </VStack>
        </VStack>
      )}
    </CollapseCard>
  );
};

export default ExpensesCard;
