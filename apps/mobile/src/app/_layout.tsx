import { useFonts } from '@expo-google-fonts/exo-2';
import { ThemeProvider } from '@react-navigation/native';
import { getNavigationTheme, PortalHost, useColorScheme } from '@sabersprops/ui';
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
import { fontToLoad } from '~src/theme/fonts.theme';

import '~src/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        Toast.show({ text2: error instanceof Error ? error.message : undefined, type: 'error' });
      },
    },
    queries: { gcTime: 1000 * 60 * 10, staleTime: 1000 * 60 * 2 },
  },
});

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);
  const { isDarkColorScheme, colorScheme } = useColorScheme();

  return isFontsLoaded ? (
    <SafeAreaProvider onLayout={() => SplashScreen.hideAsync()}>
      <ThemeProvider value={getNavigationTheme(isDarkColorScheme, colorScheme)}>
        <QueryClientProvider client={queryClient}>
          <Try
            catch={() => (
              <View className='flex-1 bg-background'>
                <ErrorBoundaryComponent />
              </View>
            )}>
            <Slot />
            <PortalHost />
            <Toast config={toastConfig} position='bottom' />
          </Try>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  ) : null;
};
