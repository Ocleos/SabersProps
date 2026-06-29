import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router/react-navigation';
import { Skeleton } from 'heroui-native/skeleton';
import { Tabs } from 'heroui-native/tabs';
import { Typography } from 'heroui-native/text';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { VStack } from '~src/components/ui/stack.component';
import type { Expense } from '~src/modules/collection/types/expense.type';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { getData, PROPS_EXPENSE_TABLE } from '~src/utils/supabase.utils';
import { calculateExpenses, ExpensesTypes } from './expenses.utils';
import ExpensesChart from './expensesChart.component';

const ExpensesCard = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { data: expenses, isLoading } = useQuery({
    queryFn: async () => await getData<Expense>(PROPS_EXPENSE_TABLE),
    queryKey: propsKeys.statsExpenses(),
    select: (data) => calculateExpenses(data),
    subscribed: isFocused,
  });

  const [expensesType, setExpensesType] = useState(ExpensesTypes.YEARS);

  return (
    <AccordionWrapper itemValue='expenses' title={t('collection:STATS.LABELS.EXPENSES')}>
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
            <Tabs.List>
              <Tabs.Indicator />
              <Tabs.ScrollView>
                <Tabs.Trigger value={ExpensesTypes.DAYS}>
                  <Tabs.Label>{t('collection:STATS.LABELS.EXPENSES_TABS.DAILY')}</Tabs.Label>
                </Tabs.Trigger>
                <Tabs.Trigger value={ExpensesTypes.MONTHS}>
                  <Tabs.Label>{t('collection:STATS.LABELS.EXPENSES_TABS.MONTHLY')}</Tabs.Label>
                </Tabs.Trigger>
                <Tabs.Trigger value={ExpensesTypes.YEARS}>
                  <Tabs.Label>{t('collection:STATS.LABELS.EXPENSES_TABS.YEARLY')}</Tabs.Label>
                </Tabs.Trigger>
              </Tabs.ScrollView>
            </Tabs.List>
          </Tabs>

          <ExpensesChart data={expenses} type={expensesType} />

          <VStack className='gap-2'>
            <Typography type='h6'>{t('collection:STATS.LABELS.EXPENSES_TOTAL_MONTHLY')}</Typography>
            <ExpensesChart data={expenses} type={ExpensesTypes.GLOBAL_MONTHS} />
          </VStack>
        </VStack>
      )}
    </AccordionWrapper>
  );
};

export default ExpensesCard;
