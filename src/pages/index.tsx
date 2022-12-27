import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { Stack, useRouter } from 'expo-router';
import { changeLanguage } from 'i18next';
import { Button, Icon, IconButton, ScrollView, Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import {
  CURRENCY_EUROS,
  formatDate,
  formatNumber,
  formatToCurrency,
  formatToUnit,
  FORMAT_FULL_DATE_TIME,
} from '../utils/format.utils';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);
  const router = useRouter();

  return (
    <ScrollView>
      <Stack.Screen
        options={{
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
      />
      <Text>{formatDate(dayjs(), FORMAT_FULL_DATE_TIME)}</Text>
      <Text>{formatNumber(1234567890)}</Text>
      <Text>{formatNumber(12.6766735906654)}</Text>
      <Text>{formatToCurrency(12.6766735906654, CURRENCY_EUROS)}</Text>
      <Text>{formatToUnit(12.6766735906654, 'meter')}</Text>

      <Button onPress={() => changeLanguage('fr')}>Français</Button>
      <Button onPress={() => changeLanguage('en')}>English</Button>
    </ScrollView>
  );
}
