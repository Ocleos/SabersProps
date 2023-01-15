import { extendTheme } from 'native-base';
import { colors } from './colors.theme';
import { fontConfig, fonts } from './fonts.theme';

const extendedTheme = extendTheme({
  colors: colors,
  fontConfig: fontConfig,
  fonts: fonts,
  config: {
    initialColorMode: 'dark',
  },
});

export default extendedTheme;
