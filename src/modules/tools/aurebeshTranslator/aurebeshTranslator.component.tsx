import AurebeshTranslatorModal from './aurebeshTranslatorModal.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AurebeshTranslator: React.FC = () => {
  const { t } = useTranslation(['tools', 'common']);
  const [isTranslatorModalOpen, setIsTranslatorOpenModal] = useState(false);

  return (
    <>
      <Button
        onPress={() => setIsTranslatorOpenModal(true)}
        size={'lg'}
        leftIcon={<Icon as={MaterialCommunityIcons} name='translate' size={'md'} mr={4} />}
      >
        {t('tools:TOOLS.TRANSLATOR.TITLE')}
      </Button>

      <AurebeshTranslatorModal isOpen={isTranslatorModalOpen} onClose={() => setIsTranslatorOpenModal(false)} />
    </>
  );
};

export default AurebeshTranslator;
