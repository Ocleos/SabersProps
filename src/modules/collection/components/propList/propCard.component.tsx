import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SabersPropsIcon } from '@src/assets/sabersProps.icon';
import Card from '@src/components/card/card.component';
import { Prop } from '@src/models/prop.model';
import { propStates } from '@src/models/propState.model';
import { propTypes } from '@src/models/propType.model';
import { useRouter } from 'expo-router';
import {
  Center,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Pressable,
  Text,
  VStack,
  useColorModeValue,
} from 'native-base';
import { useCollectionStore } from '../../store/collection.store';

interface IPropCardProps {
  prop: Prop;
}

const PropCardComponent: React.FC<IPropCardProps> = ({ prop }) => {
  const router = useRouter();

  const { setSelectedProp, setIsActionsOpen } = useCollectionStore();

  return (
    <Pressable onPress={() => router.push(`/collection/${prop.id}/informations`)}>
      <Card borderColor={`${propStates[prop.state].colorScheme}.500`}>
        <Icon
          position={'absolute'}
          right={2}
          bottom={2}
          as={SabersPropsIcon}
          name={propTypes[prop.type].iconName}
          color={useColorModeValue('primary.200:alpha.50', 'primary.800:alpha.50')}
          size={24}
        />

        <HStack space={2}>
          <VStack space={2} flex={1}>
            <Heading>{prop.name}</Heading>
            <Heading size='sm'>{prop.character}</Heading>
            <HStack space={2}>
              <Text fontSize={'sm'}>{prop.manufacturer}</Text>
              <Divider bg='primary.500' thickness={2} orientation='vertical' h={5} />
              <Text fontSize={'sm'}>{prop.chassisDesigner}</Text>
            </HStack>
            <Text fontSize={'sm'}>{prop.soundboard}</Text>
          </VStack>

          <Center>
            <IconButton
              icon={<Icon as={MaterialCommunityIcons} name='dots-vertical' />}
              borderRadius={'full'}
              variant={'ghost'}
              size='lg'
              colorScheme={'primary'}
              onPress={() => {
                setSelectedProp(prop);
                setIsActionsOpen(true);
              }}
            />
          </Center>
        </HStack>
      </Card>
    </Pressable>
  );
};

export default PropCardComponent;