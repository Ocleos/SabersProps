import { useRouter } from 'expo-router';
import { Card } from 'heroui-native/card';
import { PressableFeedback } from 'heroui-native/pressable-feedback';
import { GripVerticalIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import type { ComposedGesture } from 'react-native-gesture-handler';
import { GestureDetector } from 'react-native-gesture-handler';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import { Icon } from '~src/components/ui/icon.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import { foldersKeys } from '~src/utils/queryKeys.utils';
import { FOLDERS_TABLE } from '~src/utils/supabase.utils';
import { useFoldersStore } from '../../stores/folders.store';
import type { Folder } from '../../types/folder.type';

type FolderCardProps = {
  count?: number;
  drag?: ComposedGesture;
  folder: Folder;
  isActive?: boolean;
};

const FolderCard: React.FC<FolderCardProps> = ({ count, drag, folder, isActive }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { setSelectedFolder, selectedFolder } = useFoldersStore();

  return (
    <PressableFeedback
      className={isActive ? 'opacity-70' : undefined}
      onPress={() => router.navigate(`/collection/folders/${folder.id}`)}>
      <PressableFeedback.Highlight />
      <PressableFeedback.Ripple />
      <Card>
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

            <VStack className='grow'>
              <Card.Title>{folder.name}</Card.Title>
              <Card.Description>{t('collection:FOLDERS.LABELS.PROPS_COUNT', { count: count ?? 0 })}</Card.Description>
            </VStack>

            <ActionsMenu
              idSelected={selectedFolder?.id}
              invalidateQueryKey={foldersKeys.root()}
              nameSelected={selectedFolder?.name}
              onActionSelected={() => setSelectedFolder(folder)}
              resetSelected={() => setSelectedFolder(undefined)}
              routeEdit={'/collection/folders/form'}
              tableName={FOLDERS_TABLE}
            />
          </HStack>
        </Card.Header>
      </Card>
    </PressableFeedback>
  );
};

export default FolderCard;
