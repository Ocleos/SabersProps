import type { Theme } from 'expo-router/build/react-navigation';
import { useThemeColor } from 'heroui-native/hooks';
import { Uniwind, useUniwind } from 'uniwind';

export const useColorScheme = () => {
  const { theme } = useUniwind();

  const [accentColor, dangerColor, backgroundColor, foregroundColor, borderColor, surfaceColor] = useThemeColor([
    'accent',
    'danger',
    'background',
    'foreground',
    'border',
    'surface',
  ]);

  const toggleColorScheme = () => {
    if (theme === 'dark') {
      Uniwind.setTheme('light');
    } else {
      Uniwind.setTheme('dark');
    }
  };

  const isDarkScheme = theme === 'dark';

  const navigationTheme: Theme = {
    colors: {
      background: backgroundColor,
      border: borderColor,
      card: surfaceColor,
      notification: dangerColor,
      primary: accentColor,
      text: foregroundColor,
    },
    dark: isDarkScheme,
    fonts: {
      bold: {
        fontFamily: 'Exo2_700Bold',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'Exo2_800ExtraBold',
        fontWeight: '800',
      },
      medium: {
        fontFamily: 'Exo2_500Medium',
        fontWeight: '500',
      },
      regular: {
        fontFamily: 'Exo2_400Regular',
        fontWeight: '400',
      },
    },
  };

  return {
    colorScheme: theme,
    isDarkScheme,
    navigationTheme,
    toggleColorScheme,
  };
};
