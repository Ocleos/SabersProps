import { useFonts } from '@expo-google-fonts/exo-2';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { PortalHost } from '~src/components/_ui/primitives/portal';
import { toastConfig } from '~src/components/toast/toastWrapper.component';
import '~src/i18n.config';
import { navigationTheme } from '~src/theme/customTheme.theme';
import { fontToLoad } from '~src/theme/fonts.theme';
import { gluestackUIConfig } from '~src/theme/gluestack-ui.config';
import { useColorScheme } from '~src/theme/useColorTheme.theme';

import '~src/theme/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return isFontsLoaded ? (
    <SafeAreaProvider onLayout={() => SplashScreen.hideAsync()}>
      <GluestackUIProvider config={gluestackUIConfig} colorMode={colorScheme}>
        <ThemeProvider value={navigationTheme(isDarkColorScheme)}>
          <Slot />
          <PortalHost />
          <Toast position='bottom' config={toastConfig} />
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  ) : null;
};
