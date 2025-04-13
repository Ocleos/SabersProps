import {
  Button,
  DEFAULT_ICON_SIZE,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Text,
  colorsTheme,
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

      Toast.show({ type: 'success', text2: t('common:FORMS.DELETE_SUCCESS') });
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
            <MoreVerticalIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-48' insets={{ ...insets, left: 24, right: 24 }}>
          <DropdownMenuItem onPress={onEditPress}>
            <PencilIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.foreground[colorScheme]} />
            <Text>{t('common:COMMON.EDIT')}</Text>
          </DropdownMenuItem>

          <DropdownMenuItem onPress={onDeletePress}>
            <Trash2Icon size={DEFAULT_ICON_SIZE} color={colorsTheme.foreground[colorScheme]} />
            <Text>{t('common:COMMON.DELETE')}</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        description={t('common:FORMS.DELETE_CONFIRM', { name: nameSelected })}
        onConfirm={onConfirmDelete}
        isLoading={isPending}
      />
    </>
  );
};

export default ActionsMenu;
