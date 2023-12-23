import { Box, Heading, Icon, Pressable } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import React from 'react';
import LinearGradient from '~src/theme/linearGradient.theme';
import { Module } from '../models/module.models';

type HomeButtonProps = {
  module: Module;
};

const HomeButton: React.FC<HomeButtonProps> = ({ module }) => {
  const router = useRouter();

  return (
    <Box w='$1/2' p='$2'>
      <LinearGradient colors={['$primary500', '$primary700']} rounded='$xl'>
        <Pressable
          onPress={() => router.push(module.route)}
          h='$40'
          p='$4'
          alignItems='center'
          justifyContent='center'
          gap='$4'>
          <Icon as={module.icon} color='$textLight0' w='$12' h='$12' sx={{ props: { size: 48 } }} />
          <Heading color='$textLight0'>{module.title}</Heading>
        </Pressable>
      </LinearGradient>
    </Box>
  );
};

export default HomeButton;
