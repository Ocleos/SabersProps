import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@gluestack-ui/themed';
import { X } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ViewProps } from 'react-native';

export interface IModalWrapperProps extends ViewProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  mainButton?: React.ReactNode;
  hasCancelButton?: boolean;
}

const ModalWrapper: React.FC<IModalWrapperProps> = (props) => {
  const { t } = useTranslation(['common']);

  const { title, isOpen, onClose, mainButton, hasCancelButton, children } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent maxHeight={'$2/3'}>
        <ModalHeader>
          <Heading size='lg'>{title}</Heading>
          <ModalCloseButton>
            <Icon as={X} size='xl' />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack flex={1} gap={'$4'} justifyContent='flex-end'>
            {hasCancelButton && (
              <Button variant='outline' action='secondary' onPress={onClose}>
                <ButtonText>{t('common:COMMON.CANCEL')}</ButtonText>
              </Button>
            )}

            {mainButton ? (
              mainButton
            ) : (
              <Button onPress={onClose}>
                <ButtonText>{t('common:COMMON.CLOSE')}</ButtonText>
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
