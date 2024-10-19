import { useFonts } from '@expo-google-fonts/exo-2';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost, useColorScheme } from '@sabersprops/ui';
import { Slot } from 'expo-router';
import { Try } from 'expo-router/build/views/Try';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ErrorBoundaryComponent from '~src/components/error/errorBoundary.component';
import { toastConfig } from '~src/components/toast/toastWrapper.component';
import '~src/i18n.config';
import { navigationTheme } from '~src/theme/customTheme.theme';
import { fontToLoad } from '~src/theme/fonts.theme';

import '~src/theme/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);
  const { isDarkColorScheme } = useColorScheme();

  return isFontsLoaded ? (
    <SafeAreaProvider onLayout={() => SplashScreen.hideAsync()}>
      <ThemeProvider value={navigationTheme(isDarkColorScheme)}>
        <Try catch={() => <ErrorBoundaryComponent />}>
          <Slot />
          <PortalHost />
          <Toast position='bottom' config={toastConfig} />
        </Try>
      </ThemeProvider>
    </SafeAreaProvider>
  ) : null;
};
