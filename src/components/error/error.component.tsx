import { Button } from 'heroui-native/button';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ErrorBoundaryIcon from '~src/assets/errorBoundary.icon';
import { VStack } from '../ui/stack.component';

type ErrorComponentProps = {
  onRetry?: () => void;
  title?: string;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ onRetry, title }) => {
  const { t } = useTranslation();

  return (
    <VStack className='gap-10'>
      <View className='mt-10 items-center'>
        <ErrorBoundaryIcon height={250} width={250} />
      </View>
      <Typography className='text-center' type='h4'>
        {title ?? t('common:ERRORS.UNKNOWN_ERROR')}
      </Typography>
      {onRetry && (
        <Button onPress={onRetry}>
          <Button.Label>{t('common:COMMON.RETRY')}</Button.Label>
        </Button>
      )}
    </VStack>
  );
};

export default ErrorComponent;
