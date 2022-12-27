import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, useColorMode } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../i18n.config';

export default function Layout() {
  const { colorMode } = useColorMode();

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
        <Stack />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
