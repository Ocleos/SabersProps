import { Box } from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';

const Card: React.FC<ComponentProps<typeof Box>> = (props) => {
  return (
    <Box
      p={'$4'}
      borderWidth={'$1'}
      borderRadius={'$lg'}
      sx={{
        _dark: {
          borderColor: props.borderColor ?? '$borderDark800',
          bg: '$backgroundDark900',
        },
        _light: {
          borderColor: props.borderColor ?? '$borderLight200',
          bg: '$backgroundLight100',
        },
      }}
      {...props}
    />
  );
};

export default Card;
