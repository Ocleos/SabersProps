import { ArrowRightLeft, CalendarDays, ShoppingCart, Store, Truck } from 'lucide-react-native';
import { View } from 'react-native';
import { useSWRConfig } from 'swr';
import LabelIcon from '~src/components/label/labelIcon.component';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { PropComponent } from '~src/modules/collection/models/propComponent.model';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { CURRENCY_EUROS, FORMAT_DATE, formatDate, formatNumber, formatToCurrency } from '~src/utils/format.utils';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT } from '~src/utils/supabase.utils';
import { Card, CardContent, CardHeader, CardTitle } from '~ui/card';
import { HStack, VStack } from '~ui/stack';

interface IPropComponentCard {
  propComponent: PropComponent;
}

const PropComponentCard: React.FC<IPropComponentCard> = ({ propComponent }) => {
  const { selectedComponent, setSelectedComponent } = usePropDetailStore();

  const { mutate } = useSWRConfig();

  return (
    <Card>
      <CardHeader>
        <HStack className='items-center gap-2'>
          <CardTitle className='grow'>{propComponent.label}</CardTitle>
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
      </CardHeader>

      <CardContent>
        <VStack className='gap-2'>
          <HStack>
            <View className='basis-1/2'>
              <LabelIcon label={formatDate(propComponent.date, FORMAT_DATE)} icon={CalendarDays} />
            </View>

            <View className='basis-1/2'>
              <LabelIcon label={propComponent.seller} icon={Store} />
            </View>
          </HStack>

          <HStack>
            <View className='basis-1/3'>
              <LabelIcon label={formatNumber(propComponent.rate, { maximumFractionDigits: 5 })} icon={ArrowRightLeft} />
            </View>

            <View className='basis-1/3'>
              <LabelIcon label={formatToCurrency(propComponent.priceEuros, CURRENCY_EUROS)} icon={ShoppingCart} />
            </View>

            <View className='basis-1/3'>
              <LabelIcon label={formatToCurrency(propComponent.feesEuros, CURRENCY_EUROS)} icon={Truck} />
            </View>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
};

export default PropComponentCard;
