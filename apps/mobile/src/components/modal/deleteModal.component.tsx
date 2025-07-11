import { Button, Text } from '@sabersprops/ui';
import { useTranslation } from 'react-i18next';
import ModalWrapper, { type IModalWrapperProps } from './modalWrapper.component';

interface IDeleteModalProps extends IModalWrapperProps {
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteModal: React.FC<IDeleteModalProps> = (props) => {
  const { t } = useTranslation(['common']);
  const { onConfirm, isLoading } = props;

  return (
    <ModalWrapper
      hasCancelButton={true}
      mainButton={
        <Button disabled={isLoading} onPress={onConfirm} variant='destructive'>
          <Text>{t('common:COMMON.DELETE')}</Text>
        </Button>
      }
      title={t('common:COMMON.DELETE')}
      {...props}
    />
  );
};

export default DeleteModal;
