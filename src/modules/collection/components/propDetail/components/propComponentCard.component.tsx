import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import { ArrowRightLeft, CalendarDays, ShoppingCart, Store, Truck } from 'lucide-react-native';
import { useSWRConfig } from 'swr';
import Card from '~src/components/card/card.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { PropComponent } from '~src/modules/collection/models/propComponent.model';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { CURRENCY_EUROS, FORMAT_DATE, formatDate, formatNumber, formatToCurrency } from '~src/utils/format.utils';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT } from '~src/utils/supabase.utils';

interface IPropComponentCard {
  propComponent: PropComponent;
}

const PropComponentCard: React.FC<IPropComponentCard> = ({ propComponent }) => {
  const { selectedComponent, setSelectedComponent } = usePropDetailStore();

  const { mutate } = useSWRConfig();

  return (
    <Card>
      <VStack gap={'$2'}>
        <HStack gap={'$2'} alignItems='center'>
          <Text flex={1} fontWeight={'bold'}>
            {propComponent.label}
          </Text>

          <ActionsMenu
            onActionSelected={() => setSelectedComponent(propComponent)}
            routeEdit={`/collection/${selectedComponent?.idProp}/components/form`}
            urlEndpoint={COMPONENTS_URL_ENDPOINT}
            idSelected={selectedComponent?.id}
            nameSelected={selectedComponent?.label}
            resetSelected={() => setSelectedComponent(undefined)}
            onDeleteCallback={() => mutate([PROPS_URL_ENDPOINT, selectedComponent?.idProp])}
          />
        </HStack>

        <HStack>
          <Box w={'$2/5'}>
            <LabelIcon label={formatDate(propComponent.date, FORMAT_DATE)} icon={CalendarDays} />
          </Box>

          <Box w={'$3/5'}>
            <LabelIcon label={propComponent.seller} icon={Store} />
          </Box>
        </HStack>

        <HStack>
          <Box w={'$1/3'}>
            <LabelIcon label={formatNumber(propComponent.rate, { maximumFractionDigits: 5 })} icon={ArrowRightLeft} />
          </Box>

          <Box w={'$1/3'}>
            <LabelIcon label={formatToCurrency(propComponent.priceEuros, CURRENCY_EUROS)} icon={ShoppingCart} />
          </Box>

          <Box w={'$1/3'}>
            <LabelIcon label={formatToCurrency(propComponent.feesEuros, CURRENCY_EUROS)} icon={Truck} />
          </Box>
        </HStack>
      </VStack>
    </Card>
  );
};

export default PropComponentCard;
