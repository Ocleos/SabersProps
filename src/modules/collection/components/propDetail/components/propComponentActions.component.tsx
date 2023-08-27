import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DeleteModal from '@src/components/modal/deleteModal.component';
import { usePropDetailStore } from '@src/modules/collection/store/propDetail.store';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT, deleteData } from '@src/utils/supabase.utils';
import { showErrorToaster, showSuccessToaster } from '@src/utils/toaster.utils';
import { useRouter } from 'expo-router';
import { Actionsheet, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

const PropComponentActions: React.FC = () => {
  const { t } = useTranslation(['common']);
  const {
    selectedComponent,
    setSelectedComponent,
    isActionsOpen,
    setIsActionsOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = usePropDetailStore();

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(COMPONENTS_URL_ENDPOINT, deleteData);
  const { mutate } = useSWRConfig();

  const onClose = () => {
    setSelectedComponent(undefined);
    setIsDeleteModalOpen(false);
    setIsActionsOpen(false);
  };

  const onConfirmDelete = async () => {
    if (selectedComponent?.id) {
      try {
        await trigger(selectedComponent.id);
        mutate([PROPS_URL_ENDPOINT, selectedComponent.idProp]);
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
              router.push(`/collection/${selectedComponent?.idProp}/components/form`);
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
        content={t('common:FORMS.DELETE_CONFIRM', { name: selectedComponent?.label })}
        onConfirm={onConfirmDelete}
        isLoading={isMutating}
      />
    </>
  );
};

export default PropComponentActions;
