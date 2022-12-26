import { Children } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../i18n.config';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Children />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
