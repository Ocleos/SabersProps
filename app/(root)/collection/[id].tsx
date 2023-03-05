import PageLayout from '@src/components/layout/pageLayout.component';
import { useSearchParams } from 'expo-router';
import { Text } from 'native-base';

export default () => {
  const { id } = useSearchParams();
  return (
    <PageLayout>
      <Text>Détail {id}</Text>
    </PageLayout>
  );
};
