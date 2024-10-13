import type { Theme } from '@react-navigation/native';
import { colorsTheme } from './nativewind.theme';

export const navigationTheme = (isDarkTheme: boolean): Theme => {
  return {
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
