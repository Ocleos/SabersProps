import { Card } from 'heroui-native/card';
import { ArrowRightLeftIcon, CalendarDaysIcon, ShoppingCartIcon, StoreIcon, TruckIcon } from 'lucide-react-native';
import { View } from 'react-native';
import LabelIcon from '~src/components/label/labelIcon.component';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import type { PropComponent } from '~src/modules/collection/types/propComponent.type';
import { CURRENCY_EUROS, FORMAT_DATE, formatDate, formatNumber, formatToCurrency } from '~src/utils/format.utils';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { COMPONENTS_TABLE } from '~src/utils/supabase.utils';

type PropComponentCardProps = {
  propComponent: PropComponent;
};

const PropComponentCard: React.FC<PropComponentCardProps> = ({ propComponent }) => {
  const { setSelectedComponent } = usePropDetailStore();

  return (
    <Card>
      <Card.Header>
        <HStack className='items-center justify-between gap-2'>
          <Card.Title className='grow'>{propComponent.label}</Card.Title>

          <ActionsMenu
            idSelected={propComponent.id}
            invalidateQueryKey={propsKeys.root()}
            nameSelected={propComponent.label}
            onActionSelected={() => setSelectedComponent(propComponent)}
            resetSelected={() => setSelectedComponent(undefined)}
            routeEdit={`/(root)/collection/${propComponent?.idProp}/form`}
            tableName={COMPONENTS_TABLE}
          />
        </HStack>
      </Card.Header>

      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};

export default PropComponentCard;
