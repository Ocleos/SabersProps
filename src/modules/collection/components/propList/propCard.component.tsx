import { Center, Divider, HStack, Heading, Icon, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import Card from '~src/components/card/card.component';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { Prop } from '~src/models/prop.model';
import { propStates } from '~src/models/propState.model';
import { propTypes } from '~src/models/propType.model';
import { PROPS_URL_ENDPOINT } from '~src/utils/supabase.utils';
import { useCollectionStore } from '../../stores/collection.store';

interface IPropCardProps {
  prop: Prop;
}

const PropCardComponent: React.FC<IPropCardProps> = ({ prop }) => {
  const router = useRouter();

  const { setSelectedProp } = useCollectionStore();

  return (
    <Pressable onPress={() => router.push(`/collection/${prop.id}/informations`)}>
      <Card borderColor={`$${propStates[prop.state].colorScheme}500`}>
        <Icon
          position='absolute'
          right={'$2'}
          bottom={'$2'}
          as={propTypes[prop.type].icon}
          sx={{
            _dark: {
              color: '$primary800',
            },
            _light: {
              color: '$primary200',
            },
          }}
          w={'$24'}
          h={'$24'}
          opacity={50}
        />

        <HStack gap={'$2'}>
          <VStack flex={1} gap={'$2'}>
            <Heading>{prop.name}</Heading>
            <Heading size='sm'>{prop.character}</Heading>
            <HStack gap={'$2'}>
              <Text size='sm'>{prop.manufacturer}</Text>
              <Divider orientation='vertical' bg='$primary500' />
              <Text size='sm'>{prop.chassisDesigner}</Text>
            </HStack>
            <Text size='sm'>{prop.soundboard}</Text>
          </VStack>

          <Center>
            <ActionsMenu
              onActionSelected={() => setSelectedProp(prop)}
              routeEdit={'/collection/form'}
              urlEndpoint={PROPS_URL_ENDPOINT}
              idSelected={prop?.id}
              nameSelected={prop?.name}
              resetSelected={() => setSelectedProp(undefined)}
            />
          </Center>
        </HStack>
      </Card>
    </Pressable>
  );
};

export default PropCardComponent;
