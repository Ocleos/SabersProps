import { VStack } from '@gluestack-ui/themed';
import { CreditCard, HardHat, ShoppingCart, Tags, Truck } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import { formatToCurrency } from '~src/utils/format.utils';
import type { PropDetail } from '../../../models/propDetail.model';

interface IPricesCard {
  prop: PropDetail;
}

const PricesCard: React.FC<IPricesCard> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  return (
    <CollapseCard title={t('collection:CATEGORIES.PRICES')} isOpened={true}>
      <VStack gap={'$2'}>
        <LabelIcon label={prop.prices?.price ? formatToCurrency(prop.prices.price) : '-'} icon={CreditCard} />
        <LabelIcon label={prop.prices?.fees ? formatToCurrency(prop.prices.fees) : '-'} icon={Truck} />
        <LabelIcon label={prop.prices?.total ? formatToCurrency(prop.prices.total) : '-'} icon={ShoppingCart} />
        <LabelIcon label={prop.prices?.workPrice ? formatToCurrency(prop.prices.workPrice) : '-'} icon={HardHat} />
        <LabelIcon label={prop.prices?.sellingPrice ? formatToCurrency(prop.prices.sellingPrice) : '-'} icon={Tags} />
      </VStack>
    </CollapseCard>
  );
};

export default PricesCard;
