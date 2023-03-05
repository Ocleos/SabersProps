import PageLayout from '@src/components/layout/pageLayout.component';
import { useRouter } from 'expo-router';
import { Button, Text, VStack } from 'native-base';

export default () => {
  const router = useRouter();
  return (
    <PageLayout>
      <VStack space={4}>
        <Button onPress={() => router.push('/collection/1')}>Id 1</Button>
        <Button onPress={() => router.push('/collection/1')}>Id 2</Button>
        <Button onPress={() => router.push('/collection/form')}>Ajouter</Button>
        <Text>Collection Liste</Text>
      </VStack>
    </PageLayout>
  );
};
