import { FontResolver, createConfig } from '@gluestack-style/react';
import { config as defaultConfig } from '@gluestack-ui/config';

export const gluestackUIConfig = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary0: '#E4FFF4',
      primary50: '#ECFDF5',
      primary100: '#D1FAE5',
      primary200: '#A7F3D0',
      primary300: '#6EE7B7',
      primary400: '#34D399',
      primary500: '#10B981',
      primary600: '#059669',
      primary700: '#047857',
      primary800: '#065F46',
      primary900: '#064E3B',
      primary950: '#071F11',

      tertiary0: '#E5F1FB',
      tertiary50: '#CCE9FF',
      tertiary100: '#ADDBFF',
      tertiary200: '#7CC2FF',
      tertiary300: '#4AA9FF',
      tertiary400: '#1A91FF',
      tertiary500: '#0077E6',
      tertiary600: '#005DB4',
      tertiary700: '#004282',
      tertiary800: '#002851',
      tertiary900: '#011838',
      tertiary950: '#000711',
    },
    fontWeights: {
      ...defaultConfig.tokens.fontWeights,
      bold: 600,
    },
    fonts: {
      heading: 'Exo2',
      body: 'Exo2',
      mono: 'Exo2',
    },
  },
  plugins: [new FontResolver()],
});
