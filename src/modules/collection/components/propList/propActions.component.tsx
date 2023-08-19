import { useCollectionStore } from '../../store/collection.store';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DeleteModal from '@src/components/modal/deleteModal.component';
import { PROPS_URL_ENDPOINT, deleteData } from '@src/utils/supabase.utils';
import { showErrorToaster, showSuccessToaster } from '@src/utils/toaster.utils';
import { useRouter } from 'expo-router';
import { Actionsheet, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';

const PropActions: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { selectedProp, setSelectedProp, isActionsOpen, setIsActionsOpen, isDeleteModalOpen, setIsDeleteModalOpen } =
    useCollectionStore();

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(PROPS_URL_ENDPOINT, deleteData);

  const onClose = () => {
    setSelectedProp(undefined);
    setIsDeleteModalOpen(false);
    setIsActionsOpen(false);
  };

  const onConfirmDelete = async () => {
    if (selectedProp?.id) {
      try {
        await trigger(selectedProp.id);
        showSuccessToaster(t('common:FORMS.DELETE_SUCCESS'));
        onClose();
      } catch (error) {
        showErrorToaster(error);
      }
    }
  };

  return (
    <>
      <Actionsheet isOpen={isActionsOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialCommunityIcons} size={8} name='lead-pencil' />}
            onPress={() => {
              setIsActionsOpen(false);
              router.push('/collection/form');
            }}
          >
            {t('common:COMMON.EDIT')}
          </Actionsheet.Item>

          <Actionsheet.Item
            startIcon={<Icon as={MaterialCommunityIcons} size={8} name='delete' />}
            onPress={() => {
              setIsActionsOpen(false);
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
        content={t('common:FORMS.DELETE_CONFIRM', { name: selectedProp?.name })}
        onConfirm={onConfirmDelete}
        isLoading={isMutating}
      />
    </>
  );
};

export default PropActions;
