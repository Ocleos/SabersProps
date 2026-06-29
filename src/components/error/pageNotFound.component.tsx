import { useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { Typography } from 'heroui-native/text';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import PageNotFoundIcon from '~src/assets/pageNotFound.icon';
import { VStack } from '../ui/stack.component';

const PageNotFound: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <VStack className='max-w-xs gap-10 self-center'>
      <View className='mx-10 mt-10 items-center'>
        <PageNotFoundIcon height={250} width={250} />
      </View>

      <Typography className='text-center' type='h4'>
        {t('common:ERRORS.PAGE_NOT_FOUND')}
      </Typography>

      <Button onPress={() => router.replace('/')}>
        <Button.Label>{t('common:ERRORS.HOME_RETURN')}</Button.Label>
      </Button>
    </VStack>
  );
};

export default PageNotFound;
