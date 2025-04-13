import { Button, Large, Text, VStack } from '@sabersprops/ui';
import * as Updates from 'expo-updates';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ErrorBoundaryIcon from '~src/assets/errorBoundary.icon';

const ErrorBoundaryComponent: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <VStack className='max-w-xs gap-10 self-center'>
      <View className='mx-10 mt-10 items-center'>
        <ErrorBoundaryIcon width={250} height={250} />
      </View>

      <Large className='text-center'>{t('common:ERRORS.UNKNOWN_ERROR')}</Large>

      <Button onPress={() => Updates.reloadAsync()}>
        <Text>{t('common:ERRORS.HOME_RETURN')}</Text>
      </Button>
    </VStack>
  );
};

export default ErrorBoundaryComponent;
