import { useRouter } from 'expo-router';
import { Card } from 'heroui-native/card';
import { useThemeColor } from 'heroui-native/hooks';
import { PressableFeedback } from 'heroui-native/pressable-feedback';
import { Separator } from 'heroui-native/separator';
import { Typography } from 'heroui-native/text';
import { cn } from 'heroui-native/utils';
import { View } from 'react-native';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE } from '~src/utils/supabase.utils';
import { useCollectionStore } from '../../stores/collection.store';
import type { Prop } from '../../types/prop.type';
import { propStates } from '../../types/propState.type';
import { propTypes } from '../../types/propType.type';

type PropCardProps = {
  prop: Prop;
};

const PropCard: React.FC<PropCardProps> = ({ prop }) => {
  const { setSelectedProp } = useCollectionStore();
  const router = useRouter();

  const PropIcon = propTypes[prop.type].icon;

  const [accentColor] = useThemeColor(['accent']);

  return (
    <PressableFeedback onPress={() => router.navigate(`/(root)/collection/${prop.id}/informations`)}>
      <PressableFeedback.Highlight />
      <PressableFeedback.Ripple />
      <Card className={cn('border-2', propStates[prop.state].colorScheme.border)}>
        <Card.Header>
          <HStack className='items-center gap-2'>
            <Typography className='grow' type='h3'>
              {prop.name}
            </Typography>

            <ActionsMenu
              idSelected={prop.id}
              invalidateQueryKey={propsKeys.root()}
              nameSelected={prop.name}
              onActionSelected={() => setSelectedProp(prop)}
              resetSelected={() => setSelectedProp(undefined)}
              routeEdit={'/(root)/collection/formProp'}
              tableName={PROPS_TABLE}
            />
          </HStack>
        </Card.Header>

        <Card.Body>
          <VStack className='gap-2'>
            <Typography type='h5'>{prop.character}</Typography>

            <HStack className='gap-2'>
              <Typography>{prop.manufacturer}</Typography>
              <Separator className='bg-accent' orientation='vertical' />
              <Typography>{prop.chassisDesigner}</Typography>
            </HStack>

            <Typography>{prop.soundboard}</Typography>
          </VStack>

          <View className='absolute right-0 bottom-0 opacity-30'>
            <PropIcon color={accentColor} height={96} width={96} />
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
};

export default PropCard;
