import { DrawerContent, DrawerContentComponentProps, DrawerToggleButton } from '@react-navigation/drawer';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useAssets } from 'expo-asset';
import { Avatar, Box, Divider, HStack, Heading } from 'native-base';

export const withDrawerToggle: NativeStackNavigationOptions = {
  headerLeft: (props) => <DrawerToggleButton {...props} />,
};

const DrawerLayout: React.FC<DrawerContentComponentProps> = (props) => {
  const [assets] = useAssets([require('~assets/icon.png')]);

  return (
    <Box flex={1} safeArea={true}>
      <HStack p={4} space={4} alignItems={'center'}>
        <Avatar
          size={'md'}
          source={{
            uri: assets ? assets[0].uri : undefined,
          }}
        />
        <Heading color={'primary.500'}>SabersProps</Heading>
      </HStack>

      <Divider />

      <DrawerContent {...props} />
    </Box>
  );
};

export default DrawerLayout;
