import { useFonts } from '@expo-google-fonts/exo-2';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost, useColorScheme } from '@sabersprops/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { Try } from 'expo-router/build/views/Try';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
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

SplashScreen.setOptions({
  fade: true,
  duration: 1000,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 10 },
    mutations: {
      onError: (error) => {
        Toast.show({ type: 'error', text2: error instanceof Error ? error.message : undefined });
      },
    },
  },
});

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);
  const { isDarkColorScheme } = useColorScheme();

  return isFontsLoaded ? (
    <SafeAreaProvider onLayout={() => SplashScreen.hideAsync()}>
      <ThemeProvider value={navigationTheme(isDarkColorScheme)}>
        <QueryClientProvider client={queryClient}>
          <Try
            catch={() => (
              <View className='flex-1 bg-background'>
                <ErrorBoundaryComponent />
              </View>
            )}>
            <Slot />
            <PortalHost />
            <Toast position='bottom' config={toastConfig} />
          </Try>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  ) : null;
};
