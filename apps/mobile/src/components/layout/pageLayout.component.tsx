import { DrawerActions } from '@react-navigation/native';
import { Button, colorsTheme, DEFAULT_ICON_SIZE, fontFamily, useColorScheme } from '@sabersprops/ui';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { ArrowLeftIcon, MenuIcon } from 'lucide-react-native';
import { ScrollView, View, type ViewProps } from 'react-native';

interface IPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  viewProps?: ViewProps;
  isScrollable?: boolean;
  hasDrawerToggle?: boolean;
}

const PageLayout: React.FC<IPageLayoutProps> = ({
  title,
  viewProps,
  isScrollable,
  hasDrawerToggle = false,
  children,
}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { isDarkColorScheme, colorScheme } = useColorScheme();

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
                <MenuIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
              </Button>
            ) : (
              <Button className='mr-2' onPressIn={() => router.back()} size='icon' variant='ghost'>
                <ArrowLeftIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
              </Button>
            );
          },
          headerTitleStyle: { fontFamily: fontFamily.exo2Medium },
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: colorsTheme.card[colorScheme],
          statusBarStyle: isDarkColorScheme ? 'light' : 'dark',
          title,
        }}
      />

      {isScrollable ? (
        <ScrollView className='flex-1 p-4' {...viewProps}>
          <View className='mb-8'>{children}</View>
        </ScrollView>
      ) : (
        <View className='flex-1 p-4' {...viewProps}>
          {children}
        </View>
      )}
    </View>
  );
};

export default PageLayout;
