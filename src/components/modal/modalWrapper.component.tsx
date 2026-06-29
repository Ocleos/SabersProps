import { Button } from 'heroui-native/button';
import { Dialog } from 'heroui-native/dialog';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { HStack, VStack } from '../ui/stack.component';

export type ModalWrapperProps = {
  content?: React.ReactNode;
  description?: string;
  hasCancelButton?: boolean;
  isOpen: boolean;
  mainButton?: React.ReactNode;
  onClose: () => void;
  title?: string;
};

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {
  const { t } = useTranslation();

  const { title, description, content, isOpen, onClose, mainButton, hasCancelButton } = props;

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <VStack className='gap-4'>
            <HStack className='items-center'>
              <Dialog.Title className='grow'>{title}</Dialog.Title>
              <Dialog.Close variant='ghost' />
            </HStack>

            <VStack className='gap-2'>
              {description && <Dialog.Description>{description}</Dialog.Description>}
              {content && <View className='min-w-80'>{content}</View>}
            </VStack>

            <HStack className='justify-end gap-4'>
              {hasCancelButton && (
                <Button onPress={onClose} variant='outline'>
                  <Button.Label>{t('common:COMMON.CANCEL')}</Button.Label>
                </Button>
              )}

              {mainButton ? (
                mainButton
              ) : (
                <Button onPress={onClose}>
                  <Button.Label>{t('common:COMMON.CLOSE')}</Button.Label>
                </Button>
              )}
            </HStack>
          </VStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ModalWrapper;
