import { useRouter } from 'expo-router';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import useSWRMutation from 'swr/mutation';
import { Button } from '~rnr/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~rnr/ui/dropdown-menu';
import { Text } from '~rnr/ui/text';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { deleteData } from '~src/utils/supabase.utils';
import DeleteModal from '../modal/deleteModal.component';

type IActionsMenuProps = {
  onActionSelected: () => void;
  routeEdit: string;
  urlEndpoint: string;
  idSelected?: string;
  nameSelected?: string;
  onDeleteCallback?: () => void;
  resetSelected: () => void;
};

const ActionsMenu: React.FC<IActionsMenuProps> = (props) => {
  const { t } = useTranslation(['common']);
  const router = useRouter();

  const { colorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);

  const { idSelected, nameSelected, onActionSelected, routeEdit, urlEndpoint, onDeleteCallback, resetSelected } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { trigger, isMutating } = useSWRMutation(urlEndpoint, deleteData);

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
      try {
        await trigger(idSelected);

        if (onDeleteCallback) {
          onDeleteCallback();
        }

        Toast.show({ type: 'success', text2: t('common:FORMS.DELETE_SUCCESS') });
        onClose();
      } catch (error) {
        Toast.show({ type: 'error', text2: error instanceof Error ? error.message : undefined });
      }
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'>
            <MoreVertical color={colorsTheme.primary[500]} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-48' insets={{ ...insets, left: 24, right: 24 }}>
          <DropdownMenuItem onPress={onEditPress}>
            <Pencil color={colorsTheme.foreground[colorScheme]} />
            <Text>{t('common:COMMON.EDIT')}</Text>
          </DropdownMenuItem>

          <DropdownMenuItem onPress={onDeletePress}>
            <Trash2 color={colorsTheme.foreground[colorScheme]} />
            <Text>{t('common:COMMON.DELETE')}</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        description={t('common:FORMS.DELETE_CONFIRM', { name: nameSelected })}
        onConfirm={onConfirmDelete}
        isLoading={isMutating}
      />
    </>
  );
};

export default ActionsMenu;
