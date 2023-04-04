import { SabersPropsIcon } from '@src/assets/sabersProps.icon';
import Card from '@src/components/card/card.component';
import { ItemCollection } from '@src/models/itemCollection.model';
import { getIconFromType } from '@src/models/itemType.model';
import { Divider, HStack, Heading, Icon, Text, VStack, useColorModeValue } from 'native-base';

interface IItemCardProps {
  item: ItemCollection;
}

const ItemCardComponent: React.FC<IItemCardProps> = ({ item }) => {
  const iconName = getIconFromType(item.type);

  return (
    <Card>
      <Icon
        position={'absolute'}
        bottom={4}
        right={4}
        as={SabersPropsIcon}
        name={iconName}
        color={useColorModeValue('primary.200:alpha.50', 'primary.800:alpha.50')}
        size={24}
      />

      <VStack space={2}>
        <Heading>{item.name}</Heading>
        <Heading size='sm'>{item.character}</Heading>
        <HStack space={2}>
          <Text fontSize={'sm'}>{item.manufacturer}</Text>
          <Divider bg='primary.500' thickness={2} orientation='vertical' h={5} />
          <Text fontSize={'sm'}>{item.chassisDesigner}</Text>
        </HStack>
        <Text fontSize={'sm'}>{item.soundboard}</Text>
      </VStack>
    </Card>
  );
};

export default ItemCardComponent;
