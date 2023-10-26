import { Avatar, AvatarImage, Divider, HStack, Heading } from '@gluestack-ui/themed';
import { DrawerContent, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAssets } from 'expo-asset';
import { SafeAreaView } from 'react-native-safe-area-context';

const DrawerLayout: React.FC<DrawerContentComponentProps> = (props) => {
  const [assets] = useAssets([require('~assets/icon.png')]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack gap={'$4'} p={'$4'} alignItems='center'>
        <Avatar>
          <AvatarImage source={{ uri: assets ? assets[0].uri : undefined }} />
        </Avatar>

        <Heading color='$primary500' size='2xl'>
          SabersProps
        </Heading>
      </HStack>

      <Divider />

      <DrawerContent {...props} />
    </SafeAreaView>
  );
};

export default DrawerLayout;
