import PageLayout from '@src/components/layout/pageLayout.component';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'native-base';

export default () => {
  const { id } = useLocalSearchParams();
  return (
    <PageLayout>
      <Text>Détail {id}</Text>
    </PageLayout>
  );
};
