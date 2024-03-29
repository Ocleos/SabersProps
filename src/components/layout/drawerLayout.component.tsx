import { DrawerContent, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoIcon from '~src/assets/icons/logo.icon';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { Separator } from '~ui/separator';
import { HStack } from '~ui/stack';
import { H3 } from '~ui/typography';

const DrawerLayout: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack className='items-center gap-4 p-4'>
        <View className='h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background'>
          <LogoIcon color={colorsTheme.primary[500]} />
        </View>

        <H3 className='text-primary'>SabersProps</H3>
      </HStack>

      <Separator />

      <DrawerContent {...props} />
    </SafeAreaView>
  );
};

export default DrawerLayout;
