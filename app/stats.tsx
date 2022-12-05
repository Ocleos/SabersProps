import { useLink } from 'expo-router';
import { Box, Button, Text } from 'native-base';
import React from 'react';

export default function Stats() {
  const link = useLink();

  return (
    <Box flex={1} bg="#00f" alignItems="center" justifyContent="center">
      <Text>Stats</Text>

      <Button onPress={() => link.back()}>Home</Button>
    </Box>
  );
}
