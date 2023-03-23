import { Box, IBoxProps, useColorModeValue } from 'native-base';

const Card: React.FC<IBoxProps> = (props) => {
  return (
    <Box
      borderRadius={'lg'}
      mb={4}
      p={4}
      borderWidth={1}
      borderColor={useColorModeValue('light.200', 'dark.200')}
      bg={useColorModeValue('trueGray.50', 'trueGray.900')}
      shadow={4}
      {...props}
    />
  );
};

export default Card;
