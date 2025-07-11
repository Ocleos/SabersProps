import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  HStack,
  Text,
} from '@sabersprops/ui';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export interface IModalWrapperProps {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  mainButton?: React.ReactNode;
  hasCancelButton?: boolean;
}

const ModalWrapper: React.FC<IModalWrapperProps> = (props) => {
  const { t } = useTranslation(['common']);

  const { title, description, content, isOpen, onClose, mainButton, hasCancelButton } = props;

  return (
    <Dialog
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
      open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          {content && <View className='min-w-80'>{content}</View>}
        </DialogHeader>

        <DialogFooter>
          <HStack className='justify-end gap-4'>
            {hasCancelButton && (
              <Button onPress={onClose} variant='outline'>
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
