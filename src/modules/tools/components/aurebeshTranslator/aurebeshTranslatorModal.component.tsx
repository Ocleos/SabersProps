import { Button, HStack, IModalProps, ITextProps, Modal, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';

const AurebeshTranslatorModal: React.FC<IModalProps> = (props) => {
  const { t } = useTranslation(['tools', 'common']);

  const alphabetCode = Array.from(Array(26)).map((_, i) => i + 65);
  const alphabet = alphabetCode.map((x) => String.fromCharCode(x));

  const textProps: ITextProps = {
    fontSize: '6xl',
    textAlign: 'center',
    w: 20,
    h: 20,
  };

  return (
    <Modal {...props}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{t('tools:TOOLS.TRANSLATOR.TITLE')}</Modal.Header>
        <Modal.Body>
          <VStack>
            {alphabet.map((character) => (
              <HStack space={4} key={character} justifyContent={'center'}>
                <Text fontFamily={'Aurebesh'} {...textProps} textTransform={'lowercase'}>
                  {character}
                </Text>
                <Text {...textProps}>{character}</Text>
              </HStack>
            ))}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={props.onClose}>{t('common:COMMON.CLOSE')}</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AurebeshTranslatorModal;
