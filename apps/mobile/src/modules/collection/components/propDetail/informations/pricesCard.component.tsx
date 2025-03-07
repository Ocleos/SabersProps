import { HStack, VStack } from '@sabersprops/ui';
import { CreditCardIcon, HardHatIcon, ShoppingCartIcon, TagsIcon, TruckIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import CollapseCard from '~src/components/card/collapseCard.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import { formatToCurrency } from '~src/utils/format.utils';
import SellingPriceButton from './sellingPriceModal/sellingPriceButton.component';

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

        <HStack className='items-center gap-4'>
          <LabelIcon
            label={prop.prices?.sellingPrice ? formatToCurrency(prop.prices.sellingPrice) : '-'}
            icon={TagsIcon}
          />
          <SellingPriceButton prop={prop} />
        </HStack>
      </VStack>
    </CollapseCard>
  );
};

export default PricesCard;
