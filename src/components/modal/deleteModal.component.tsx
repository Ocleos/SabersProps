import { AlertDialog, Button, IModalProps } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IDeleteModalProps extends IModalProps {
  title?: string;
  content: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteModal: React.FC<IDeleteModalProps> = (props) => {
  const { t } = useTranslation(['common']);
  const { isOpen, onClose, title, content, onConfirm, isLoading } = props;

  const cancelRef = React.useRef(null);

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        {title && (
          <>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>{title}</AlertDialog.Header>
          </>
        )}

        <AlertDialog.Body>{content}</AlertDialog.Body>

        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              {t('common:COMMON.CANCEL')}
            </Button>
            <Button colorScheme="danger" onPress={onConfirm} isLoading={isLoading}>
              {t('common:COMMON.CONFIRM')}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteModal;
