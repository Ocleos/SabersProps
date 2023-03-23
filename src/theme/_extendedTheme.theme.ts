import { colors } from './colors.theme';
import { fontConfig, fonts } from './fonts.theme';
import TextTheme from './themeComponents/text.style';
import { extendTheme } from 'native-base';

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
