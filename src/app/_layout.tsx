import { useFonts } from '@expo-google-fonts/exo-2';
import { ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { toastConfig } from '~src/components/toast/toastWrapper.component';
import '~src/i18n.config';
import { PortalHost } from '@rn-primitives/portal';
import { navigationTheme } from '~src/theme/customTheme.theme';
import { fontToLoad } from '~src/theme/fonts.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';

import '~src/theme/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);
  const { isDarkColorScheme } = useColorScheme();

  return isFontsLoaded ? (
    <SafeAreaProvider onLayout={() => SplashScreen.hideAsync()}>
      <ThemeProvider value={navigationTheme(isDarkColorScheme)}>
        <Slot />
        <PortalHost />
        <Toast position='bottom' config={toastConfig} />
      </ThemeProvider>
    </SafeAreaProvider>
  ) : null;
};
