import { Theme } from '@react-navigation/native';
import { gluestackUIConfig } from './gluestack-ui.config';

export const navigationTheme = (isDarkTheme: boolean): Theme => {
  const config = gluestackUIConfig;

  return {
    dark: isDarkTheme,
    colors: {
      primary: config.tokens.colors.primary500,
      background: isDarkTheme ? config.tokens.colors.backgroundDark950 : config.tokens.colors.backgroundLight50,
      card: isDarkTheme ? config.tokens.colors.backgroundDark900 : config.tokens.colors.backgroundLight100,
      border: isDarkTheme ? config.tokens.colors.borderDark800 : config.tokens.colors.borderLight200,
      text: isDarkTheme ? config.tokens.colors.textDark200 : config.tokens.colors.textLight700,
      notification: config.tokens.colors.primary500,
    },
  };
};
