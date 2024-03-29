import { useRouter } from 'expo-router';
import { Languages } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { Button } from '~ui/button';
import { VStack } from '~ui/stack';
import { Text } from '~ui/text';

const ToolsPage: React.FC = () => {
  const { t } = useTranslation(['tools']);
  const router = useRouter();

  return (
    <VStack className='gap-4'>
      <Button onPress={() => router.navigate('/tools/aurebeshTranslator')}>
        <Languages color={colorsTheme.textForeground} />
        <Text>{t('tools:TOOLS.TRANSLATOR.TITLE')}</Text>
      </Button>
    </VStack>
  );
};

export default ToolsPage;
