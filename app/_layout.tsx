import { Children } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Children />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
