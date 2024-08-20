import { CreditCardIcon, HardHatIcon, ShoppingCartIcon, TagsIcon, TruckIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { VStack } from '~rnr/ui/stack';
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
      <VStack className='gap-2'>
        <LabelIcon label={prop.prices?.price ? formatToCurrency(prop.prices.price) : '-'} icon={CreditCardIcon} />
        <LabelIcon label={prop.prices?.fees ? formatToCurrency(prop.prices.fees) : '-'} icon={TruckIcon} />
        <LabelIcon label={prop.prices?.total ? formatToCurrency(prop.prices.total) : '-'} icon={ShoppingCartIcon} />
        <LabelIcon label={prop.prices?.workPrice ? formatToCurrency(prop.prices.workPrice) : '-'} icon={HardHatIcon} />
        <LabelIcon
          label={prop.prices?.sellingPrice ? formatToCurrency(prop.prices.sellingPrice) : '-'}
          icon={TagsIcon}
        />
      </VStack>
    </CollapseCard>
  );
};

export default PricesCard;
