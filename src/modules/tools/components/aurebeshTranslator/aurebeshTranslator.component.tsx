import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { Languages } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalWrapper from '~src/components/modal/modalWrapper.component';
import AurebeshTranslatorModal from './aurebeshTranslatorModal.component';

const AurebeshTranslator: React.FC = () => {
  const { t } = useTranslation(['tools', 'common']);
  const [isTranslatorModalOpen, setIsTranslatorOpenModal] = useState(false);

  return (
    <>
      <Button onPress={() => setIsTranslatorOpenModal(true)}>
        <ButtonIcon as={Languages} />
        <ButtonText marginHorizontal={'$2'}>{t('tools:TOOLS.TRANSLATOR.TITLE')}</ButtonText>
      </Button>

      <ModalWrapper
        title={t('tools:TOOLS.TRANSLATOR.TITLE')}
        isOpen={isTranslatorModalOpen}
        onClose={() => setIsTranslatorOpenModal(false)}
      >
        <AurebeshTranslatorModal />
      </ModalWrapper>
    </>
  );
};

export default AurebeshTranslator;
