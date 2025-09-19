import { DrawerActions } from '@react-navigation/native';
import { Button, fontFamily, Icon, THEME, useColorScheme } from '@sabersprops/ui';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { ArrowLeftIcon, MenuIcon } from 'lucide-react-native';
import { ScrollView, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  viewProps?: ViewProps;
  isScrollable?: boolean;
  isSafe?: boolean;
  hasDrawerToggle?: boolean;
}

const PageLayout: React.FC<IPageLayoutProps> = ({
  title,
  viewProps,
  isScrollable,
  isSafe,
  hasDrawerToggle = false,
  children,
}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { isDarkColorScheme, colorScheme } = useColorScheme();

  const { bottom } = useSafeAreaInsets();

  return (
    <View className='flex-1'>
      <Stack.Screen
        options={{
          headerLeft: () => {
            return hasDrawerToggle ? (
              <Button
                className='mr-2'
                onPressIn={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                size='icon'
                variant='ghost'>
                <Icon as={MenuIcon} className='text-primary' />
              </Button>
            ) : (
              <Button className='mr-2' onPressIn={() => router.back()} size='icon' variant='ghost'>
                <Icon as={ArrowLeftIcon} className='text-primary' />
              </Button>
            );
          },
          headerTitleStyle: { fontFamily: fontFamily.exo2Medium },
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: THEME[colorScheme].card,
          statusBarStyle: isDarkColorScheme ? 'light' : 'dark',
          title,
        }}
      />

      {isScrollable ? (
        <ScrollView
          className='flex-1 p-4'
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          {...viewProps}>
          <View className='mb-8'>{children}</View>
          <View style={{ height: isSafe ? 0 : bottom }} />
        </ScrollView>
      ) : (
        <View className='flex-1 p-4 pb-0' style={{ marginBottom: isSafe ? 0 : bottom }} {...viewProps}>
          {children}
        </View>
      )}
    </View>
  );
};

export default PageLayout;
