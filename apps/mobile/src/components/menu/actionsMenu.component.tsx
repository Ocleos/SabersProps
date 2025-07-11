import {
  Button,
  colorsTheme,
  DEFAULT_ICON_SIZE,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Text,
  useColorScheme,
} from '@sabersprops/ui';
import { type QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import DeleteModal from '~src/components/modal/deleteModal.component';
import { deleteData } from '~src/utils/supabase.utils';

type IActionsMenuProps = {
  onActionSelected: () => void;
  routeEdit: string;
  tableName: string;
  invalidateQueryKey: QueryKey;
  idSelected?: string;
  nameSelected?: string;
  onDeleteCallback?: () => void;
  resetSelected: () => void;
};

const ActionsMenu: React.FC<IActionsMenuProps> = (props) => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();

  const {
    idSelected,
    nameSelected,
    onActionSelected,
    routeEdit,
    tableName,
    invalidateQueryKey,
    onDeleteCallback,
    resetSelected,
  } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => await deleteData(tableName, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });

      if (onDeleteCallback) {
        onDeleteCallback();
      }

      Toast.show({ text2: t('common:FORMS.DELETE_SUCCESS'), type: 'success' });
      onClose();
    },
  });

  const onClose = () => {
    setIsDeleteModalOpen(false);
    resetSelected();
  };

  const onEditPress = () => {
    onActionSelected();
    router.navigate(routeEdit);
  };

  const onDeletePress = () => {
    onActionSelected();
    setIsDeleteModalOpen(true);
  };

  const onConfirmDelete = async () => {
    if (idSelected) {
      await mutate(idSelected);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreVerticalIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-48' insets={{ ...insets, left: 24, right: 24 }}>
          <DropdownMenuItem onPress={onEditPress}>
            <PencilIcon color={colorsTheme.foreground[colorScheme]} size={DEFAULT_ICON_SIZE} />
            <Text>{t('common:COMMON.EDIT')}</Text>
          </DropdownMenuItem>

          <DropdownMenuItem onPress={onDeletePress}>
            <Trash2Icon color={colorsTheme.foreground[colorScheme]} size={DEFAULT_ICON_SIZE} />
            <Text>{t('common:COMMON.DELETE')}</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal
        description={t('common:FORMS.DELETE_CONFIRM', { name: nameSelected })}
        isLoading={isPending}
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        onConfirm={onConfirmDelete}
      />
    </>
  );
};

export default ActionsMenu;
