import { useFonts } from '@expo-google-fonts/exo-2';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '~src/i18n.config';
import { navigationTheme } from '~src/theme/customTheme.theme';
import { fontToLoad } from '~src/theme/fonts.theme';
import { gluestackUIConfig } from '~src/theme/gluestack-ui.config';
import { ThemeContext } from '~src/theme/themeContext.theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default () => {
  const [isFontsLoaded] = useFonts(fontToLoad);

  // ThemeContext definitions
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => {
    const nextTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    setTheme(nextTheme);
  };

  return isFontsLoaded ? (
    <SafeAreaProvider onLayout={() => SplashScreen.hideAsync()}>
      <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
        <GluestackUIProvider config={gluestackUIConfig} colorMode={theme}>
          <ThemeProvider value={navigationTheme(isDarkTheme)}>
            <Slot />
          </ThemeProvider>
        </GluestackUIProvider>
      </ThemeContext.Provider>
    </SafeAreaProvider>
  ) : null;
};
