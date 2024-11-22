import { Button, DEFAULT_ICON_SIZE, Text, VStack, colorsTheme } from '@sabersprops/ui';
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
        <LanguagesIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
        <Text>{t('tools:TOOLS.TRANSLATOR.TITLE')}</Text>
      </Button>
    </VStack>
  );
};

export default ToolsPage;