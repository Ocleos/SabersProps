import { AntDesign } from '@expo/vector-icons';
import PageLayout from '@src/components/layout/pageLayout.component';
import { useCollectionStore } from '@src/store/collection.store';
import { isPending } from '@src/utils/status.utils';
import { useRouter } from 'expo-router';
import { Box, Fab, Icon, Spinner, Text, VStack } from 'native-base';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);
  const router = useRouter();

  const { collection, status, fetchCollection } = useCollectionStore();

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <PageLayout stackOptions={{ title: t('routing:ROUTING.COLLECTION.INITIAL') ?? '' }}>
      <VStack space={4}>
        {isPending(status) ? <Spinner size="lg" /> : null}
        {collection.map((item) => (
          <Box key={item.id}>
            <Text>
              {item.name} - {item.character}
            </Text>
          </Box>
        ))}
      </VStack>
      <Fab
        renderInPortal={false}
        placement={'bottom-right'}
        onPress={() => router.push('/collection/form')}
        shadow={2}
        icon={<Icon as={AntDesign} name="plus" size="lg" />}
      />
    </PageLayout>
  );
};
