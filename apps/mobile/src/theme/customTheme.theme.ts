import type { Theme } from '@react-navigation/native';
import { colorsTheme } from '@sabersprops/ui';
import { navigationFontFamily } from './fonts.theme';

export const navigationTheme = (isDarkTheme: boolean): Theme => {
  return {
    fonts: {
      regular: {
        fontFamily: navigationFontFamily,
        fontWeight: '400',
      },
      medium: {
        fontFamily: navigationFontFamily,
        fontWeight: '500',
      },
      bold: {
        fontFamily: navigationFontFamily,
        fontWeight: '700',
      },
      heavy: {
        fontFamily: navigationFontFamily,
        fontWeight: '800',
      },
    },
    dark: isDarkTheme,
    colors: {
      primary: colorsTheme.primary[500],
      background: isDarkTheme ? colorsTheme.background.dark : colorsTheme.background.light,
      card: isDarkTheme ? colorsTheme.card.dark : colorsTheme.card.light,
      border: isDarkTheme ? colorsTheme.border.dark : colorsTheme.border.light,
      text: isDarkTheme ? colorsTheme.foreground.dark : colorsTheme.foreground.light,
      notification: colorsTheme.red[500],
    },
  };
};
