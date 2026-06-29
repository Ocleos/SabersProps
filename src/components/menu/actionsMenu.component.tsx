import { type QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Href, useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { Menu } from 'heroui-native/menu';
import { useToast } from 'heroui-native/toast';
import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { deleteData } from '~src/utils/supabase.utils';
import { getToastSuccessConfig } from '~src/utils/toast.utils';
import DeleteModal from '../modal/deleteModal.component';
import { Icon } from '../ui/icon.component';

type ActionsMenuProps = {
  onActionSelected: () => void;
  routeEdit: Href;
  tableName: string;
  invalidateQueryKey: QueryKey;
  idSelected?: string;
  nameSelected?: string;
  onDeleteCallback?: () => void;
  resetSelected: () => void;
};

const ActionsMenu: React.FC<ActionsMenuProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

      toast.show(getToastSuccessConfig({ description: t('common:FORMS.DELETE_SUCCESS') }));

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
    <View>
      <Menu>
        <Menu.Trigger asChild>
          <Button isIconOnly variant='ghost'>
            <Icon as={MoreVerticalIcon} className='text-accent' />
          </Button>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Overlay />
          <Menu.Content className='w-48' presentation='popover'>
            <Menu.Group>
              <Menu.Item id='edit' onPress={onEditPress}>
                <Icon as={PencilIcon} className='text-foreground' />
                <Menu.ItemTitle>{t('common:COMMON.EDIT')}</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item id='delete' onPress={onDeletePress} variant='danger'>
                <Icon as={Trash2Icon} className='text-danger' />
                <Menu.ItemTitle>{t('common:COMMON.DELETE')}</Menu.ItemTitle>
              </Menu.Item>
            </Menu.Group>
          </Menu.Content>
        </Menu.Portal>
      </Menu>

      <DeleteModal
        description={t('common:FORMS.DELETE_CONFIRM', { name: nameSelected })}
        isLoading={isPending}
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        onConfirm={onConfirmDelete}
      />
    </View>
  );
};

export default ActionsMenu;
