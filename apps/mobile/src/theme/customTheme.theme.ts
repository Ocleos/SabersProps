import type { Theme } from '@react-navigation/native';
import { colorsTheme } from '@sabersprops/ui';
import { navigationFontFamily } from './fonts.theme';

export const navigationTheme = (isDarkTheme: boolean): Theme => {
  return {
    colors: {
      background: isDarkTheme ? colorsTheme.background.dark : colorsTheme.background.light,
      border: isDarkTheme ? colorsTheme.border.dark : colorsTheme.border.light,
      card: isDarkTheme ? colorsTheme.card.dark : colorsTheme.card.light,
      notification: colorsTheme.red[500],
      primary: colorsTheme.primary[500],
      text: isDarkTheme ? colorsTheme.foreground.dark : colorsTheme.foreground.light,
    },
    dark: isDarkTheme,
    fonts: {
      bold: {
        fontFamily: navigationFontFamily,
        fontWeight: '700',
      },
      heavy: {
        fontFamily: navigationFontFamily,
        fontWeight: '800',
      },
      medium: {
        fontFamily: navigationFontFamily,
        fontWeight: '500',
      },
      regular: {
        fontFamily: navigationFontFamily,
        fontWeight: '400',
      },
    },
  };
};
