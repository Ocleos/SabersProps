import { useLink } from 'expo-router';
import { Box, Button, Text } from 'native-base';
import React from 'react';

export default function Home() {
  const link = useLink();

  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <Text>Home</Text>

      <Button onPress={() => link.push('stats')}>Stats</Button>
    </Box>
  );
}
