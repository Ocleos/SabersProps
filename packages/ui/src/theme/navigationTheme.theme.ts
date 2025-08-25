import type { Theme } from '@react-navigation/native';
import { THEME } from './colors.theme';

export const defaultFontFamily = 'Exo2';

export const getNavigationTheme = (isDarkTheme: boolean): Theme => {
  return {
    colors: {
      background: isDarkTheme ? THEME.dark.background : THEME.light.background,
      border: isDarkTheme ? THEME.dark.border : THEME.light.border,
      card: isDarkTheme ? THEME.dark.card : THEME.light.card,
      notification: isDarkTheme ? THEME.dark.destructive : THEME.light.destructive,
      primary: isDarkTheme ? THEME.dark.primary : THEME.light.primary,
      text: isDarkTheme ? THEME.dark.foreground : THEME.light.foreground,
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
