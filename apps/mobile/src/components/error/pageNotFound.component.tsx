import { Button, Text, VStack } from '@sabersprops/ui';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import PageNotFoundIcon from '~src/assets/pageNotFound.icon';
import { appRoutes } from '~src/router/routes.utils';

const PageNotFoundComponent: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <VStack className='max-w-xs gap-10 self-center'>
      <View className='mx-10 mt-10 items-center'>
        <PageNotFoundIcon height={250} width={250} />
      </View>

      <Text className='text-center' variant='large'>
        {t('common:ERRORS.PAGE_NOT_FOUND')}
      </Text>

      <Button onPress={() => router.replace(appRoutes.home)}>
        <Text>{t('common:ERRORS.HOME_RETURN')}</Text>
      </Button>
    </VStack>
  );
};

export default PageNotFoundComponent;
