import {
  Exo2_100Thin,
  Exo2_100Thin_Italic,
  Exo2_200ExtraLight,
  Exo2_200ExtraLight_Italic,
  Exo2_300Light,
  Exo2_300Light_Italic,
  Exo2_400Regular,
  Exo2_400Regular_Italic,
  Exo2_500Medium,
  Exo2_500Medium_Italic,
  Exo2_600SemiBold,
  Exo2_600SemiBold_Italic,
  Exo2_700Bold,
  Exo2_700Bold_Italic,
  Exo2_800ExtraBold,
  Exo2_800ExtraBold_Italic,
  Exo2_900Black,
  Exo2_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/exo-2';
import extendedTheme from '@src/theme/_extendedTheme.theme';
import { Slot, SplashScreen } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';

import '@src/i18n.config';
import { Aurebesh, StarWarsGlyphicons } from '@src/theme/fonts.theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [isFontsLoaded] = useFonts({
    Exo2_100Thin,
    Exo2_200ExtraLight,
    Exo2_300Light,
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,
    Exo2_700Bold,
    Exo2_800ExtraBold,
    Exo2_900Black,
    Exo2_100Thin_Italic,
    Exo2_200ExtraLight_Italic,
    Exo2_300Light_Italic,
    Exo2_400Regular_Italic,
    Exo2_500Medium_Italic,
    Exo2_600SemiBold_Italic,
    Exo2_700Bold_Italic,
    Exo2_800ExtraBold_Italic,
    Exo2_900Black_Italic,
    StarWarsGlyphicons,
    Aurebesh,
  });

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