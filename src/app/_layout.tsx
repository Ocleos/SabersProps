import { useFonts } from '@expo-google-fonts/exo-2';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationBar } from 'expo-navigation-bar';
import { Slot, ThemeProvider } from 'expo-router';
import { Try } from 'expo-router/build/views/Try';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { type HeroUINativeConfig, HeroUINativeProvider } from 'heroui-native/provider';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Uniwind } from 'uniwind';
import ErrorBoundary from '~src/components/error/errorBoundary.component';
import { fontToLoad } from '~src/theme/fonts.theme';
import { useColorScheme } from '~src/theme/useColorScheme.hooks';

import '~src/i18n.config';
import '~src/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { gcTime: 1000 * 60 * 10, staleTime: 1000 * 60 * 2 },
  },
});

const config: HeroUINativeConfig = {
  devInfo: {
    stylingPrinciples: false,
  },
  textProps: {
    // Auto-adjust font size to fit container
    adjustsFontSizeToFit: false,
    // Disable font scaling for accessibility
    allowFontScaling: false,
    // Maximum font size multiplier when scaling
    maxFontSizeMultiplier: 1.5,
    // Minimum font scale (iOS only, 0.01-1.0)
    minimumFontScale: 0.5,
  },
};

Uniwind.setTheme('dark');

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);

  const { isDarkScheme, navigationTheme } = useColorScheme();

  return isFontsLoaded ? (
    <GestureHandlerRootView className='flex-1'>
      <HeroUINativeProvider config={config}>
        <ThemeProvider value={navigationTheme}>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <Try
                catch={() => (
                  <View className='flex-1 bg-background'>
                    <ErrorBoundary />
                  </View>
                )}>
                <Slot />
                <StatusBar style={isDarkScheme ? 'light' : 'dark'} />
                <NavigationBar style={isDarkScheme ? 'light' : 'dark'} />
              </Try>
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  ) : null;
};
