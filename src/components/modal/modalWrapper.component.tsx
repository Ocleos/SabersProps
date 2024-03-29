import { useTranslation } from 'react-i18next';
import { Button } from '~ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '~ui/dialog';
import { HStack } from '~ui/stack';
import { Text } from '~ui/text';

export interface IModalWrapperProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  mainButton?: React.ReactNode;
  hasCancelButton?: boolean;
}

const ModalWrapper: React.FC<IModalWrapperProps> = (props) => {
  const { t } = useTranslation(['common']);

  const { title, description, isOpen, onClose, mainButton, hasCancelButton } = props;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <HStack className='justify-end gap-4'>
            {hasCancelButton && (
              <Button variant='outline' onPress={onClose}>
                <Text>{t('common:COMMON.CANCEL')}</Text>
              </Button>
            )}

            {mainButton ? (
              mainButton
            ) : (
              <Button onPress={onClose}>
                <Text>{t('common:COMMON.CLOSE')}</Text>
              </Button>
            )}
          </HStack>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
