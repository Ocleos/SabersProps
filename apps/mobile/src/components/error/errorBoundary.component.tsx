import { Button, Large, Text, VStack } from '@sabersprops/ui';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ErrorBoundaryIcon from '~src/assets/errorBoundary.icon';
import { appRoutes } from '~src/router/routes.utils';

const ErrorBoundaryComponent: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <VStack className='max-w-xs gap-10 self-center'>
      <View className='mx-10 mt-10 items-center'>
        <ErrorBoundaryIcon width={250} height={250} />
      </View>

      <Large className='text-center'>{t('common:ERRORS.UNKNOWN_ERROR')}</Large>

      <Button onPress={() => router.replace(appRoutes.home)}>
        <Text>{t('common:ERRORS.HOME_RETURN')}</Text>
      </Button>
    </VStack>
  );
};

export default ErrorBoundaryComponent;
