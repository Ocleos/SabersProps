import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from '~rnr/ui/button';
import { VStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { Large } from '~rnr/ui/typography';
import PageNotFoundIcon from '~src/assets/pageNotFound.icon';
import { appRoutes } from '~src/router/routes.utils';

const PageNotFoundComponent: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <VStack className='max-w-xs gap-10 self-center'>
      <View className='mx-10 mt-10 items-center'>
        <PageNotFoundIcon width={250} height={250} />
      </View>

      <Large className='text-center'>{t('common:ERRORS.PAGE_NOT_FOUND')}</Large>

      <Button onPress={() => router.replace(appRoutes.home)}>
        <Text>{t('common:ERRORS.HOME_RETURN')}</Text>
      </Button>
    </VStack>
  );
};

export default PageNotFoundComponent;
