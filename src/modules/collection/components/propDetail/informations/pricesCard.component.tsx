import { CreditCardIcon, HardHatIcon, ShoppingCartIcon, TagsIcon, TruckIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import LabelIcon from '~src/components/label/labelIcon.component';
import AccordionWrapper from '~src/components/ui/accordionWrapper.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { formatToCurrency } from '~src/utils/format.utils';
import SellingPriceButton from './sellingPriceModal/sellingPriceButton.component';

type PricesCardProps = {
  prop: PropDetail;
};

const PricesCard: React.FC<PricesCardProps> = ({ prop }) => {
  const { t } = useTranslation();

  return (
    <AccordionWrapper isOpen={true} itemValue='prices' title={t('collection:CATEGORIES.PRICES')}>
      <VStack className='gap-2'>
        <LabelIcon icon={CreditCardIcon} label={prop.prices?.price ? formatToCurrency(prop.prices.price) : '-'} />
        <LabelIcon icon={TruckIcon} label={prop.prices?.fees ? formatToCurrency(prop.prices.fees) : '-'} />
        <LabelIcon icon={ShoppingCartIcon} label={prop.prices?.total ? formatToCurrency(prop.prices.total) : '-'} />
        <LabelIcon icon={HardHatIcon} label={prop.prices?.workPrice ? formatToCurrency(prop.prices.workPrice) : '-'} />

        <HStack className='items-center gap-4'>
          <LabelIcon
            icon={TagsIcon}
            label={prop.prices?.sellingPrice ? formatToCurrency(prop.prices.sellingPrice) : '-'}
          />
          <SellingPriceButton prop={prop} />
        </HStack>
      </VStack>
    </AccordionWrapper>
  );
};

export default PricesCard;
