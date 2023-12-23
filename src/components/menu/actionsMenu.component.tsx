import { Button, ButtonIcon, Icon, Menu, MenuItem, MenuItemLabel, Text, useToast } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { isError } from 'lodash';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import { deleteData } from '~src/utils/supabase.utils';
import DeleteModal from '../modal/deleteModal.component';
import ToastWrapper from '../toast/toastWrapper.component';

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
  const toast = useToast();

  const { idSelected, nameSelected, onActionSelected, routeEdit, urlEndpoint, onDeleteCallback, resetSelected } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { trigger, isMutating } = useSWRMutation(urlEndpoint, deleteData);

  const onClose = () => {
    setIsDeleteModalOpen(false);
    resetSelected();
  };

  const onConfirmDelete = async () => {
    if (idSelected) {
      try {
        await trigger(idSelected);

        if (onDeleteCallback) {
          onDeleteCallback();
        }

        toast.show({
          render: (id) => <ToastWrapper id={id} action='success' description={t('common:FORMS.DELETE_SUCCESS')} />,
        });

        onClose();
      } catch (error) {
        toast.show({
          render: (id) => (
            <ToastWrapper id={id} action='error' description={isError(error) ? error.message : undefined} />
          ),
        });
      }
    }
  };

  return (
    <>
      <Menu
        selectionMode='single'
        onSelectionChange={(keys) => {
          // @ts-ignore TODO type
          if (keys.size === 1) {
            onActionSelected();
            // @ts-ignore TODO type
            if (keys.currentKey === 'edit') {
              router.push(routeEdit);
              // @ts-ignore TODO type
            } else if (keys.currentKey === 'delete') {
              setIsDeleteModalOpen(true);
            }
          }
        }}
        trigger={({ ...triggerProps }) => (
          <Button variant='link' {...triggerProps}>
            <ButtonIcon as={MoreVertical} size='xl' />
          </Button>
        )}>
        <MenuItem key='edit' textValue={t('common:COMMON.EDIT')}>
          <Icon as={Pencil} size='xl' />
          <MenuItemLabel ml={'$4'}>{t('common:COMMON.EDIT')}</MenuItemLabel>
        </MenuItem>

        <MenuItem key='delete' textValue={t('common:COMMON.DELETE')}>
          <Icon as={Trash2} size='xl' />
          <MenuItemLabel ml={'$4'}>{t('common:COMMON.DELETE')}</MenuItemLabel>
        </MenuItem>
      </Menu>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        title={t('common:COMMON.DELETE')}
        onConfirm={onConfirmDelete}
        isLoading={isMutating}>
        <Text>{t('common:FORMS.DELETE_CONFIRM', { name: nameSelected })}</Text>
      </DeleteModal>
    </>
  );
};

export default ActionsMenu;
