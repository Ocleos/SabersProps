import { Stack } from 'expo-router';
import { ScrollView, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation(['common', 'settings']);
  return (
    <ScrollView>
      <Stack.Screen options={{ title: t('settings:SETTINGS.TITLE') ?? '' }} />
      <Text>Settings</Text>
    </ScrollView>
  );
}
