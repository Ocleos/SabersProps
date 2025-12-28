import type { Theme } from '@react-navigation/native';
import { THEME } from './colors.theme';

export const defaultFontFamily = 'Exo2';

export const getNavigationTheme = (isDarkTheme: boolean, colorScheme: 'light' | 'dark'): Theme => {
  return {
    colors: {
      background: THEME[colorScheme].background,
      border: THEME[colorScheme].border,
      card: THEME[colorScheme].card,
      notification: THEME[colorScheme].destructive,
      primary: THEME[colorScheme].primary,
      text: THEME[colorScheme].foreground,
    },
    dark: isDarkTheme,
    fonts: {
      bold: {
        fontFamily: defaultFontFamily,
        fontWeight: '700',
      },
      heavy: {
        fontFamily: defaultFontFamily,
        fontWeight: '800',
      },
      medium: {
        fontFamily: defaultFontFamily,
        fontWeight: '500',
      },
      regular: {
        fontFamily: defaultFontFamily,
        fontWeight: '400',
      },
    },
  };
};
