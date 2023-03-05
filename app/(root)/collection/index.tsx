import { AntDesign } from '@expo/vector-icons';
import PageLayout from '@src/components/layout/pageLayout.component';
import { useRouter } from 'expo-router';
import { Button, Fab, Icon, Text, VStack } from 'native-base';

export default () => {
  const router = useRouter();
  return (
    <PageLayout>
      <VStack space={4}>
        <Button onPress={() => router.push('/collection/1')}>Id 1</Button>
        <Button onPress={() => router.push('/collection/1')}>Id 2</Button>
        <Text>Collection Liste</Text>
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
