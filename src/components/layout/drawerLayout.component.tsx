import { Avatar, Divider, HStack, Heading, Icon } from '@gluestack-ui/themed';
import { DrawerContent, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoIcon from '~src/assets/icons/logo.icon';

const DrawerLayout: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack gap={'$4'} p={'$4'} alignItems='center'>
        <Avatar bg='$secondary900' borderColor='$primary500' borderWidth={2}>
          <Icon as={LogoIcon} size='xl' color='$primary500' />
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
