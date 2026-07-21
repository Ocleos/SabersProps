import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'heroui-native/button';
import { Card } from 'heroui-native/card';
import { Tabs } from 'heroui-native/tabs';
import { useToast } from 'heroui-native/toast';
import { FolderMinusIcon, GripVerticalIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { ComposedGesture } from 'react-native-gesture-handler';
import { GestureDetector } from 'react-native-gesture-handler';
import { Icon } from '~src/components/ui/icon.component';
import { HStack } from '~src/components/ui/stack.component';
import { foldersKeys, propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE, putData } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { removePropFromFolder } from '../../services/folders.api';
import type { Prop } from '../../types/prop.type';
import { PropColumnPlacement, propColumnPlacements } from '../../types/propColumnPlacement.type';

type FolderPropRowProps = {
  drag?: ComposedGesture;
  folderId: string;
  isActive?: boolean;
  prop: Prop;
};

const FolderPropRow: React.FC<FolderPropRowProps> = ({ drag, folderId, isActive, prop }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateColumnPlacement } = useMutation({
    mutationFn: (columnPlacement: PropColumnPlacement) => putData(PROPS_TABLE, { columnPlacement, id: prop.id }),
    onError: () => {
      toast.show(getToastErrorConfig({ description: t('common:FORMS.EDIT_ERROR') }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.detail(folderId) });
    },
  });

  const { isPending: isRemoving, mutate: removeFromFolder } = useMutation({
    mutationFn: () => removePropFromFolder(prop.id ?? ''),
    onError: () => {
      toast.show(getToastErrorConfig({ description: t('common:FORMS.EDIT_ERROR') }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.root() });
      queryClient.invalidateQueries({ queryKey: propsKeys.root() });
      toast.show(getToastSuccessConfig({ description: t('common:FORMS.EDIT_SUCCESS') }));
    },
  });

  return (
    <Card className={isActive ? 'opacity-70' : undefined}>
      <Card.Header>
        <HStack className='items-center gap-2'>
          {drag ? (
            <GestureDetector gesture={drag}>
              <View
                accessibilityLabel={t('collection:FOLDERS.ACTIONS.REORDER')}
                accessibilityRole='button'
                className='items-center justify-center rounded-md p-2'>
                <Icon as={GripVerticalIcon} className='text-accent' />
              </View>
            </GestureDetector>
          ) : (
            <View className='items-center justify-center rounded-md p-2'>
              <Icon as={GripVerticalIcon} className='text-accent' />
            </View>
          )}

          <Card.Title className='grow'>{prop.name}</Card.Title>

          <Button
            accessibilityLabel={t('collection:FOLDERS.ACTIONS.REMOVE_FROM_FOLDER')}
            isDisabled={isRemoving}
            isIconOnly
            onPress={() => removeFromFolder()}
            variant='ghost'>
            <Icon as={FolderMinusIcon} className='text-danger' />
          </Button>
        </HStack>
      </Card.Header>

      <Card.Body>
        <Tabs
          onValueChange={(value) => updateColumnPlacement(Number(value))}
          value={(prop.columnPlacement ?? PropColumnPlacement.LEFT).toString()}>
          <Tabs.List className='w-full'>
            <Tabs.Indicator />
            <Tabs.Trigger
              accessibilityLabel={propColumnPlacements[PropColumnPlacement.LEFT].label}
              className='w-1/3'
              value={PropColumnPlacement.LEFT.toString()}>
              <Icon as={propColumnPlacements[PropColumnPlacement.LEFT].icon} className='size-4' />
            </Tabs.Trigger>

            <Tabs.Trigger
              accessibilityLabel={propColumnPlacements[PropColumnPlacement.MIDDLE].label}
              className='w-1/3'
              value={PropColumnPlacement.MIDDLE.toString()}>
              <Icon as={propColumnPlacements[PropColumnPlacement.MIDDLE].icon} className='size-4' />
            </Tabs.Trigger>

            <Tabs.Trigger
              accessibilityLabel={propColumnPlacements[PropColumnPlacement.RIGHT].label}
              className='w-1/3'
              value={PropColumnPlacement.RIGHT.toString()}>
              <Icon as={propColumnPlacements[PropColumnPlacement.RIGHT].icon} className='size-4' />
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default FolderPropRow;
