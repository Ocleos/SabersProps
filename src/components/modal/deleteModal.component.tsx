import { useTranslation } from 'react-i18next';
import { Button } from '~ui/button';
import { Text } from '~ui/text';
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
      title={t('common:COMMON.DELETE')}
      mainButton={
        <Button disabled={isLoading} onPress={onConfirm} variant='destructive'>
          <Text>{t('common:COMMON.DELETE')}</Text>
        </Button>
      }
      {...props}
    />
  );
};

export default DeleteModal;
