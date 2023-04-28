import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeleteModal from '@src/components/modal/deleteModal.component';
import { deleteProp, propsUrlEndpoint } from '@src/services/props.api';
import { useCollectionStore } from '@src/store/collection.store';
import { showSuccessToaster } from '@src/utils/toaster.utils';
import { useRouter } from 'expo-router';
import { Actionsheet, Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';

const PropActionSheet: React.FC = () => {
  const { t } = useTranslation(['common']);
  const {
    selectedProp,
    setSelectedProp,
    isActionSheetOpen,
    setIsActionSheetOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = useCollectionStore();

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(propsUrlEndpoint, deleteProp);

  const onClose = () => {
    setSelectedProp(undefined);
    setIsDeleteModalOpen(false);
    setIsActionSheetOpen(false);
  };

  const onConfirmDelete = () => {
    if (selectedProp) {
      trigger(selectedProp._id);
      showSuccessToaster(t('common:FORMS.DELETE_SUCCESS') ?? '');
      onClose();
    }
  };

  return (
    <>
      <Actionsheet isOpen={isActionSheetOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={<Icon as={MaterialCommunityIcons} size={8} name="lead-pencil" />}
            onPress={() => {
              setIsActionSheetOpen(false);
              router.push('/collection/form');
            }}
          >
            {t('common:COMMON.EDIT')}
          </Actionsheet.Item>

          <Actionsheet.Item
            startIcon={<Icon as={MaterialCommunityIcons} size={8} name="delete" />}
            onPress={() => {
              setIsActionSheetOpen(false);
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
        title={t('common:COMMON.DELETE') ?? ''}
        content={t('common:FORMS.DELETE_CONFIRM', { name: selectedProp?.name }) ?? ''}
        onConfirm={onConfirmDelete}
        isLoading={isMutating}
      />
    </>
  );
};

export default PropActionSheet;
