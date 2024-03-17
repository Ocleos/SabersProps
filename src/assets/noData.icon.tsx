import { useToken } from '@gluestack-ui/themed';
import { useContext } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import { ThemeContext } from '~src/theme/themeContext.theme';

const NoDataIcon: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Svg viewBox='0 0 647.63626 632.17383' width={256} height={256}>
      <Path
        fill={useToken('colors', 'primary50')}
        d='M411.146 142.174h-174.51a15.018 15.018 0 00-15 15v387.85l-2 .61-42.81 13.11a8.007 8.007 0 01-9.99-5.31l-127.34-415.95a8.003 8.003 0 015.31-9.99l65.97-20.2 191.25-58.54 65.97-20.2a7.99 7.99 0 019.99 5.3l32.55 106.32z'
      />
      <Path
        fill={useToken('colors', 'primary800')}
        d='M449.226 140.174l-39.23-128.14a16.994 16.994 0 00-21.23-11.28l-92.75 28.39-191.24 58.55-92.75 28.4a17.015 17.015 0 00-11.28 21.23l134.08 437.93a17.027 17.027 0 0016.26 12.03 16.79 16.79 0 004.97-.75l63.58-19.46 2-.62v-2.09l-2 .61-64.17 19.65a15.015 15.015 0 01-18.73-9.95L2.666 136.734a14.98 14.98 0 019.95-18.73l92.75-28.4 191.24-58.54 92.75-28.4a15.156 15.156 0 014.41-.66 15.015 15.015 0 0114.32 10.61l39.05 127.56.62 2h2.08z'
      />
      <Path
        fill={useToken('colors', 'primary500')}
        d='M122.68 127.82a9.016 9.016 0 01-8.61-6.366l-12.88-42.072a8.999 8.999 0 015.97-11.24L283.1 14.278a9.009 9.009 0 0111.24 5.971l12.88 42.072a9.01 9.01 0 01-5.97 11.241l-175.94 53.864a8.976 8.976 0 01-2.63.395z'
      />
      <Circle cx={190.15351} cy={24.95465} r={20} fill={useToken('colors', 'primary500')} />
      <Circle
        cx={190.15351}
        cy={24.95465}
        r={12.66462}
        fill={useToken('colors', isDarkTheme ? 'backgroundDark950' : 'backgroundLight50')}
      />
      <Path
        fill={useToken('colors', 'primary50')}
        d='M602.636 582.174h-338a8.51 8.51 0 01-8.5-8.5v-405a8.51 8.51 0 018.5-8.5h338a8.51 8.51 0 018.5 8.5v405a8.51 8.51 0 01-8.5 8.5z'
      />
      <Path
        fill={useToken('colors', 'primary800')}
        d='M447.136 140.174h-210.5a17.024 17.024 0 00-17 17v407.8l2-.61v-407.19a15.018 15.018 0 0115-15h211.12zm183.5 0h-394a17.024 17.024 0 00-17 17v458a17.024 17.024 0 0017 17h394a17.024 17.024 0 0017-17v-458a17.024 17.024 0 00-17-17zm15 475a15.018 15.018 0 01-15 15h-394a15.018 15.018 0 01-15-15v-458a15.018 15.018 0 0115-15h394a15.018 15.018 0 0115 15z'
      />
      <Path
        fill={useToken('colors', 'primary500')}
        d='M525.636 184.174h-184a9.01 9.01 0 01-9-9v-44a9.01 9.01 0 019-9h184a9.01 9.01 0 019 9v44a9.01 9.01 0 01-9 9z'
      />
      <Circle cx={433.63626} cy={105.17383} r={20} fill={useToken('colors', 'primary500')} />
      <Circle
        cx={433.63626}
        cy={105.17383}
        r={12.18187}
        fill={useToken('colors', isDarkTheme ? 'backgroundDark950' : 'backgroundLight50')}
      />
    </Svg>
  );
};

export default NoDataIcon;
