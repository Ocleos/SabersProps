import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  Large,
  Separator,
  Text,
  VStack,
  cn,
  colorsTheme,
} from '@sabersprops/ui';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { Prop } from '~src/models/prop.model';
import { propStates } from '~src/models/propState.model';
import { propTypes } from '~src/models/propType.model';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import { appRoutes } from '~src/router/routes.utils';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE } from '~src/utils/supabase.utils';

interface IPropCardProps {
  prop: Prop;
}

const PropCardComponent: React.FC<IPropCardProps> = ({ prop }) => {
  const router = useRouter();

  const { setSelectedProp } = useCollectionStore();

  const PropIcon = propTypes[prop.type].icon;

  return (
    <Pressable onPress={() => router.push(appRoutes.collection.informations(prop.id))}>
      <Card className={cn(`border-${propStates[prop.state].colorScheme}-500`)}>
        <CardHeader>
          <HStack className='items-center gap-2'>
            <CardTitle className='grow'>{prop.name}</CardTitle>
            <ActionsMenu
              onActionSelected={() => setSelectedProp(prop)}
              routeEdit={appRoutes.collection.form}
              tableName={PROPS_TABLE}
              invalidateQueryKey={propsKeys.root()}
              idSelected={prop?.id}
              nameSelected={prop?.name}
              resetSelected={() => setSelectedProp(undefined)}
            />
          </HStack>
        </CardHeader>

        <CardContent>
          <VStack className='gap-2'>
            <Large>{prop.character}</Large>
            <HStack className='gap-2'>
              <Text>{prop.manufacturer}</Text>
              <Separator orientation='vertical' className='bg-primary' />
              <Text>{prop.chassisDesigner}</Text>
            </HStack>
            <Text>{prop.soundboard}</Text>
          </VStack>

          <View className='absolute right-2 bottom-2 opacity-30'>
            <PropIcon width={96} height={96} color={colorsTheme.primary[500]} />
          </View>
        </CardContent>
      </Card>
    </Pressable>
  );
};

export default PropCardComponent;
