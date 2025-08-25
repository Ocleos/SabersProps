import { Button, HStack, Icon, Text, VStack } from '@sabersprops/ui';
import { useRouter } from 'expo-router';
import { LanguagesIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { appRoutes } from '~src/router/routes.utils';

const ToolsPage: React.FC = () => {
  const { t } = useTranslation(['tools']);
  const router = useRouter();

  return (
    <VStack className='gap-4'>
      <Button onPress={() => router.navigate(appRoutes.tools.aurebeshTranslator)}>
        <HStack className='gap-2'>
          <Icon as={LanguagesIcon} className='text-primary-foreground' />
          <Text>{t('tools:TOOLS.TRANSLATOR.TITLE')}</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default ToolsPage;
