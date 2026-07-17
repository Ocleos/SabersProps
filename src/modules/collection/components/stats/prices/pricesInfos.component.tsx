import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LabelValue from '~src/components/label/labelValue.component';
import { VStack } from '~src/components/ui/stack.component';
import type { PricesInfosData } from '~src/modules/collection/types/pricesInfosData.type';
import { formatToCurrency } from '~src/utils/format.utils';

type PricesInfosProps = {
  data: PricesInfosData[];
};

const PricesInfos: React.FC<PricesInfosProps> = ({ data }) => {
  const { t } = useTranslation();

  const { sumList, meanList, dataFilter } = useMemo(() => {
    const dataFilter = data.map((value) => value.total);
    const sumList = dataFilter.reduce((total, value) => total + value, 0);
    const meanList = dataFilter.length > 0 ? sumList / dataFilter.length : 0;

    return { dataFilter, meanList, sumList };
  }, [data]);

  return (
    <VStack>
      <LabelValue title={t('common:COMMON.TOTAL')} value={formatToCurrency(sumList)} />
      <LabelValue title={t('common:COMMON.MINIMUM')} value={formatToCurrency(Math.min(...dataFilter) ?? 0)} />
      <LabelValue title={t('common:COMMON.MAXIMUM')} value={formatToCurrency(Math.max(...dataFilter) ?? 0)} />
      <LabelValue title={t('common:COMMON.AVERAGE')} value={formatToCurrency(meanList)} />
    </VStack>
  );
};

export default PricesInfos;
