import { Card, CardContent, CardHeader, CardTitle, HStack, VStack } from '@sabersprops/ui';
import { ArrowRightLeftIcon, CalendarDaysIcon, ShoppingCartIcon, StoreIcon, TruckIcon } from 'lucide-react-native';
import { View } from 'react-native';
import LabelIcon from '~src/components/label/labelIcon.component';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { PropComponent } from '~src/modules/collection/models/propComponent.model';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { appRoutes } from '~src/router/routes.utils';
import { CURRENCY_EUROS, FORMAT_DATE, formatDate, formatNumber, formatToCurrency } from '~src/utils/format.utils';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { COMPONENTS_TABLE } from '~src/utils/supabase.utils';

interface IPropComponentCard {
  propComponent: PropComponent;
}

const PropComponentCard: React.FC<IPropComponentCard> = ({ propComponent }) => {
  const { setSelectedComponent } = usePropDetailStore();

  return (
    <Card>
      <CardHeader>
        <HStack className='items-center gap-2'>
          <CardTitle className='grow'>{propComponent.label}</CardTitle>
          <ActionsMenu
            idSelected={propComponent.id}
            invalidateQueryKey={propsKeys.root()}
            nameSelected={propComponent.label}
            onActionSelected={() => setSelectedComponent(propComponent)}
            resetSelected={() => setSelectedComponent(undefined)}
            routeEdit={appRoutes.collection.components.form(propComponent.idProp)}
            tableName={COMPONENTS_TABLE}
          />
        </HStack>
      </CardHeader>

      <CardContent>
        <VStack className='gap-2'>
          <HStack>
            <View className='basis-1/2'>
              <LabelIcon icon={CalendarDaysIcon} label={formatDate(propComponent.date, FORMAT_DATE)} />
            </View>

            <View className='basis-1/2'>
              <LabelIcon icon={StoreIcon} label={propComponent.seller} />
            </View>
          </HStack>

          <HStack>
            <View className='basis-1/3'>
              <LabelIcon
                icon={ArrowRightLeftIcon}
                label={formatNumber(propComponent.rate, { maximumFractionDigits: 5 })}
              />
            </View>

            <View className='basis-1/3'>
              <LabelIcon icon={ShoppingCartIcon} label={formatToCurrency(propComponent.priceEuros, CURRENCY_EUROS)} />
            </View>

            <View className='basis-1/3'>
              <LabelIcon icon={TruckIcon} label={formatToCurrency(propComponent.feesEuros, CURRENCY_EUROS)} />
            </View>
          </HStack>
        </VStack>
      </CardContent>
    </Card>
  );
};

export default PropComponentCard;
