import { extendTheme } from 'native-base';
import { colors } from './colors.theme';
import { fontConfig, fonts } from './fonts.theme';
import TextTheme from './themeComponents/text.style';

const extendedTheme = extendTheme({
  colors: colors,
  fontConfig: fontConfig,
  fonts: fonts,
  components: {
    Text: TextTheme,
  },
  config: {
    initialColorMode: 'dark',
  },
});

export default extendedTheme;
