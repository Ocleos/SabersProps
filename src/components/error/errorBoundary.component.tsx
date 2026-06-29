import * as Updates from 'expo-updates';
import { Button } from 'heroui-native/button';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ErrorBoundaryIcon from '~src/assets/errorBoundary.icon';
import { VStack } from '../ui/stack.component';

const ErrorBoundary: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <VStack className='max-w-xs gap-10 self-center'>
      <View className='mx-10 mt-10 items-center'>
        <ErrorBoundaryIcon height={250} width={250} />
      </View>

      <Typography className='text-center' type='h4'>
        {t('common:ERRORS.UNKNOWN_ERROR')}
      </Typography>

      <Button onPress={() => Updates.reloadAsync()}>
        <Button.Label>{t('common:ERRORS.HOME_RETURN')}</Button.Label>
      </Button>
    </VStack>
  );
};

export default ErrorBoundary;
