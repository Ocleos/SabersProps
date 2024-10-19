import { VStack } from '@sabersprops/ui';
import { max, min, sum } from 'radash';
import { useTranslation } from 'react-i18next';
import LabelValue from '~src/components/label/labelValue.component';
import type { PricesInfosData } from '~src/modules/stats/models/pricesInfosData.model';
import { formatToCurrency } from '~src/utils/format.utils';

interface IPricesInfosProps {
  data: PricesInfosData[];
}

const PricesInfos: React.FC<IPricesInfosProps> = ({ data }) => {
  const { t } = useTranslation(['common']);

  const dataFilter = data.map((value) => value.total);

  const sumList = sum(dataFilter);
  const meanList = dataFilter.length > 0 ? sumList / dataFilter.length : 0;

  return (
    <VStack>
      <LabelValue title={t('common:COMMON.TOTAL')} value={formatToCurrency(sumList)} />
      <LabelValue title={t('common:COMMON.MINIMUM')} value={formatToCurrency(min(dataFilter) ?? 0)} />
      <LabelValue title={t('common:COMMON.MAXIMUM')} value={formatToCurrency(max(dataFilter) ?? 0)} />
      <LabelValue title={t('common:COMMON.AVERAGE')} value={formatToCurrency(meanList)} />
    </VStack>
  );
};

export default PricesInfos;
