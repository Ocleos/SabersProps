import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Actionsheet, Icon } from 'native-base';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import DeleteModal from '~src/components/modal/deleteModal.component';
import { deleteData } from '~src/utils/supabase.utils';
import { showErrorToaster, showSuccessToaster } from '~src/utils/toaster.utils';

interface IActionsProp {
  idSelected?: string;
  nameSelected?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelected: (selected: undefined) => void;
  urlEndpoint: string;
  routeEdit: string;
  onDeleteCallback?: () => void;
}

const ActionsMenu: React.FC<IActionsProp> = (props) => {
  const { t } = useTranslation(['common']);

  const { idSelected, nameSelected, isOpen, setIsOpen, setSelected, urlEndpoint, routeEdit, onDeleteCallback } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(urlEndpoint, deleteData);

  const onClose = () => {
    setSelected(undefined);
    setIsDeleteModalOpen(false);
    setIsOpen(false);
  };

  const onConfirmDelete = async () => {
    if (idSelected) {
      try {
        await trigger(idSelected);

        if (onDeleteCallback) {
          onDeleteCallback();
        }

        showSuccessToaster(t('common:FORMS.DELETE_SUCCESS'));
        onClose();
      } catch (error) {
        showErrorToaster(error);
      }
    }
  };

  return (
    <>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialCommunityIcons} size={8} name='pencil-outline' />}
            onPress={() => {
              setIsOpen(false);
              router.push(routeEdit);
            }}
          >
            {t('common:COMMON.EDIT')}
          </Actionsheet.Item>

          <Actionsheet.Item
            startIcon={<Icon as={MaterialCommunityIcons} size={8} name='delete-outline' />}
            onPress={() => {
              setIsOpen(false);
              setIsDeleteModalOpen(true);
            }}
          >
            {t('common:COMMON.DELETE')}
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        title={t('common:COMMON.DELETE')}
        content={t('common:FORMS.DELETE_CONFIRM', { name: nameSelected })}
        onConfirm={onConfirmDelete}
        isLoading={isMutating}
      />
    </>
  );
};

export default ActionsMenu;
