import { CreditCard, HardHat, ShoppingCart, Tags, Truck } from 'lucide-react-native';
import { VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import { formatToCurrency } from '~src/utils/format.utils';
import { PropDetail } from '../../../models/propDetail.model';

interface IPricesCard {
  prop: PropDetail;
}

const PricesCard: React.FC<IPricesCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard title={t('collection:CATEGORIES.PRICES')} isOpened={true}>
      <VStack space={2}>
        <LabelIcon label={prop.prices?.price ? formatToCurrency(prop.prices.price) : '-'} icon={{ as: CreditCard }} />
        <LabelIcon label={prop.prices?.fees ? formatToCurrency(prop.prices.fees) : '-'} icon={{ as: Truck }} />
        <LabelIcon label={prop.prices?.total ? formatToCurrency(prop.prices.total) : '-'} icon={{ as: ShoppingCart }} />
        <LabelIcon
          label={prop.prices?.workPrice ? formatToCurrency(prop.prices.workPrice) : '-'}
          icon={{ as: HardHat }}
        />
        <LabelIcon
          label={prop.prices?.sellingPrice ? formatToCurrency(prop.prices.sellingPrice) : '-'}
          icon={{ as: Tags }}
        />
      </VStack>
    </CollapseCard>
  );
};

export default PricesCard;
