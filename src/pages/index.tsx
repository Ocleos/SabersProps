import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { Box, FlatList, Icon, IconButton, Text, useTheme, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import PageLayout from '../components/layout/pageLayout.component';
import {
  CURRENCY_EUROS,
  formatDate,
  formatNumber,
  formatToCurrency,
  formatToUnit,
  FORMAT_FULL_DATE_TIME,
} from '../utils/format.utils';

const Home: React.FC = () => {
  const { t } = useTranslation(['common', 'home']);
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <PageLayout
      isScrollable={false}
      stackOptions={{
        title: t('home:HOME.TITLE') ?? '',
        headerRight: () => (
          <IconButton
            onPress={() => router.push('settings')}
            icon={<Icon as={MaterialIcons} name="settings" />}
            size="lg"
            borderRadius={'full'}
          />
        ),
      }}
    >
      <VStack space={4}>
        <Text>{formatDate(dayjs(), FORMAT_FULL_DATE_TIME)}</Text>
        <Text>{formatNumber(1234567890)}</Text>
        <Text>{formatNumber(12.6766735906654)}</Text>
        <Text>{formatToCurrency(12.6766735906654, CURRENCY_EUROS)}</Text>
        <Text>{formatToUnit(12.6766735906654, 'meter')}</Text>

        <FlatList
          numColumns={10}
          data={Object.keys(colors['primary'])}
          renderItem={({ item }) => <Box p="4" bg={`primary.${item}`} />}
        />
        <FlatList
          numColumns={10}
          data={Object.keys(colors['secondary'])}
          renderItem={({ item }) => <Box p="4" bg={`secondary.${item}`} />}
        />
        <FlatList
          numColumns={10}
          data={Object.keys(colors['tertiary'])}
          renderItem={({ item }) => <Box p="4" bg={`tertiary.${item}`} />}
        />
      </VStack>
    </PageLayout>
  );
};

export default Home;
