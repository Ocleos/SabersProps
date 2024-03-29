import { VStack } from '@gluestack-ui/themed';
import { map, max, mean, min, sum } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LabelValue from '~src/components/label/labelValue.component';
import { formatToCurrency } from '~src/utils/format.utils';
import { PricesInfosData } from '../../models/pricesInfosData.model';

type PricesInfosProps = {
  data: PricesInfosData[];
};

const PricesInfos: React.FC<PricesInfosProps> = ({ data }) => {
  const { t } = useTranslation(['common']);

  const dataFilter = map(data, 'total');

  return (
    <VStack>
      <LabelValue title={t('common:COMMON.TOTAL')} value={formatToCurrency(sum(dataFilter))} />
      <LabelValue title={t('common:COMMON.MINIMUM')} value={formatToCurrency(min(dataFilter) ?? 0)} />
      <LabelValue title={t('common:COMMON.MAXIMUM')} value={formatToCurrency(max(dataFilter) ?? 0)} />
      <LabelValue title={t('common:COMMON.AVERAGE')} value={formatToCurrency(mean(dataFilter))} />
    </VStack>
  );
};

export default PricesInfos;
