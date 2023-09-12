import { ArrowRightLeft, CalendarDays, MoreVertical, ShoppingCart, Store, Truck } from 'lucide-react-native';
import { HStack, Icon, IconButton, Text, VStack } from 'native-base';
import React from 'react';
import Card from '~src/components/card/card.component';
import LabelIcon from '~src/components/label/labelIcon.component';
import { PropComponent } from '~src/modules/collection/models/propComponent.model';
import { usePropDetailStore } from '~src/modules/collection/store/propDetail.store';
import { CURRENCY_EUROS, FORMAT_DATE, formatDate, formatNumber, formatToCurrency } from '~src/utils/format.utils';

interface IPropComponentCard {
  propComponent: PropComponent;
}

const PropComponentCard: React.FC<IPropComponentCard> = ({ propComponent }) => {
  const { setSelectedComponent, setIsActionsOpen } = usePropDetailStore();

  return (
    <Card>
      <VStack space={2}>
        <HStack space={2}>
          <Text flex={1} m={'auto'} fontWeight={'bold'}>
            {propComponent.label}
          </Text>

          <IconButton
            icon={<Icon as={MoreVertical} />}
            borderRadius={'full'}
            variant={'ghost'}
            size='lg'
            colorScheme={'primary'}
            onPress={() => {
              setSelectedComponent(propComponent);
              setIsActionsOpen(true);
            }}
          />
        </HStack>

        <HStack>
          <LabelIcon
            viewProps={{ w: '2/5' }}
            label={formatDate(propComponent.date, FORMAT_DATE)}
            icon={{ as: CalendarDays }}
          />

          <LabelIcon viewProps={{ w: '3/5' }} label={propComponent.seller} icon={{ as: Store }} />
        </HStack>

        <HStack>
          <LabelIcon
            viewProps={{ w: '1/3' }}
            label={formatNumber(propComponent.rate, { maximumFractionDigits: 5 })}
            icon={{ as: ArrowRightLeft }}
          />

          <LabelIcon
            viewProps={{ w: '1/3' }}
            label={formatToCurrency(propComponent.priceEuros, CURRENCY_EUROS)}
            icon={{ as: ShoppingCart }}
          />
          <LabelIcon
            viewProps={{ w: '1/3' }}
            label={formatToCurrency(propComponent.feesEuros, CURRENCY_EUROS)}
            icon={{ as: Truck }}
          />
        </HStack>
      </VStack>
    </Card>
  );
};

export default PropComponentCard;
