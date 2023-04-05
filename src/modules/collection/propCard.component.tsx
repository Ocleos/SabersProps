import { SabersPropsIcon } from '@src/assets/sabersProps.icon';
import Card from '@src/components/card/card.component';
import { Prop } from '@src/models/prop.model';
import { getIconFromType } from '@src/models/propType.model';
import { Divider, HStack, Heading, Icon, Text, VStack, useColorModeValue } from 'native-base';

interface IPropCardProps {
  prop: Prop;
}

const PropCardComponent: React.FC<IPropCardProps> = ({ prop }) => {
  const iconName = getIconFromType(prop.type);

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
        <Heading>{prop.name}</Heading>
        <Heading size='sm'>{prop.character}</Heading>
        <HStack space={2}>
          <Text fontSize={'sm'}>{prop.manufacturer}</Text>
          <Divider bg='primary.500' thickness={2} orientation='vertical' h={5} />
          <Text fontSize={'sm'}>{prop.chassisDesigner}</Text>
        </HStack>
        <Text fontSize={'sm'}>{prop.soundboard}</Text>
      </VStack>
    </Card>
  );
};

export default PropCardComponent;
