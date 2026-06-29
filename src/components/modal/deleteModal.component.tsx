import { Button } from 'heroui-native/button';
import { useTranslation } from 'react-i18next';
import ModalWrapper, { type ModalWrapperProps } from './modalWrapper.component';

type DeleteModalProps = {
  isLoading?: boolean;
  onConfirm: () => void;
} & ModalWrapperProps;

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  const { t } = useTranslation();
  const { onConfirm, isLoading } = props;

  return (
    <ModalWrapper
      hasCancelButton={true}
      mainButton={
        <Button isDisabled={isLoading} onPress={onConfirm} variant='danger'>
          <Button.Label>{t('common:COMMON.DELETE')}</Button.Label>
        </Button>
      }
      title={t('common:COMMON.DELETE')}
      {...props}
    />
  );
};

export default DeleteModal;
