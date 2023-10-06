import { useFonts } from '@expo-google-fonts/exo-2';
import { Slot, SplashScreen } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import '~src/i18n.config';
import extendedTheme from '~src/theme/_extendedTheme.theme';
import { fontToLoad } from '~src/theme/fonts.theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);

  useEffect(() => {
    if (isFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  return isFontsLoaded ? (
    <NativeBaseProvider theme={extendedTheme}>
      <Slot />
    </NativeBaseProvider>
  ) : null;
};
