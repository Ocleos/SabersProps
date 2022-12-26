import dayjs from 'dayjs';
import { useLink } from 'expo-router';
import { Box, Button, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n.config';
import {
  CURRENCY_EUROS,
  formatDate,
  formatNumber,
  formatToCurrency,
  formatToUnit,
  FORMAT_FULL_DATE_TIME,
} from '../utils/format.utils';

export default function Home() {
  const link = useLink();
  const { t } = useTranslation(['common', 'home']);

  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <Text>Home</Text>

      <Text>{t('common:COMMON.ADD')}</Text>
      <Text>{t('common:COMMON.DELETE')}</Text>
      <Text>{formatDate(dayjs(), FORMAT_FULL_DATE_TIME)}</Text>
      <Text>{formatNumber(1234567890)}</Text>
      <Text>{formatNumber(12.6766735906654)}</Text>
      <Text>{formatToCurrency(12.6766735906654, CURRENCY_EUROS)}</Text>
      <Text>{formatToUnit(12.6766735906654, 'meter')}</Text>

      <Button onPress={() => changeLanguage('fr')}>Français</Button>
      <Button onPress={() => changeLanguage('en')}>English</Button>

      <Button onPress={() => link.push('stats')}>Stats</Button>
    </Box>
  );
}
