import { Spinner, VStack } from '@gluestack-ui/themed';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import CollapseCard from '~src/components/card/collapseCard.component';
import { PROPS_PRICES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import type { PricesInfosData } from '../../models/pricesInfosData.model';
import PricesChart from './pricesChart.component';
import PricesInfos from './pricesInfos.component';

const PricesCard = () => {
  const { t } = useTranslation(['stats']);

  const { data, isLoading } = useSWR(PROPS_PRICES_URL_ENDPOINT, getData<PricesInfosData>);

  return (
    <CollapseCard title={t('stats:LABEL.PRICES')} isOpened={false}>
      {isLoading && <Spinner size='large' />}
      {!isNil(data) && (
        <VStack gap='$4'>
          <PricesInfos data={data} />
          <PricesChart data={data} />
        </VStack>
      )}
    </CollapseCard>
  );
};

export default PricesCard;
