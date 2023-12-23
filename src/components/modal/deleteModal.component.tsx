import { Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import ModalWrapper, { IModalWrapperProps } from './modalWrapper.component';

interface IDeleteModalProps extends IModalWrapperProps {
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteModal: React.FC<IDeleteModalProps> = (props) => {
  const { t } = useTranslation(['common']);
  const { onConfirm, isLoading, title, isOpen, onClose, children } = props;

  return (
    <ModalWrapper
      hasCancelButton={true}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      mainButton={
        <Button isDisabled={isLoading} onPress={onConfirm} action='negative'>
          {isLoading && <ButtonSpinner mr={'$2'} />}
          <ButtonText>{t('common:COMMON.DELETE')}</ButtonText>
        </Button>
      }>
      {children}
    </ModalWrapper>
  );
};

export default DeleteModal;
