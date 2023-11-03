import { styled } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { map } from 'lodash';

const LinearGradientWrapper = styled(
  LinearGradient,
  {},
  {
    resolveProps: ['colors'],
  },
  {
    propertyTokenMap: {
      colors: 'colors',
    },
    propertyResolver: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      colors: (rawValue: string[], resolver: any) => {
        map(rawValue, (color, index) => {
          rawValue[index] = resolver(color);
        });
        return rawValue;
      },
    },
  },
);

export default LinearGradientWrapper;
