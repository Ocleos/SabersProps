import { DrawerActions } from '@react-navigation/native';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { ArrowLeft, Menu } from 'lucide-react-native';
import { ScrollView, View, type ViewProps } from 'react-native';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { Button } from '~ui/button';

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
          title,
          headerTitleStyle: { fontFamily: 'Exo2_500Medium' },
          headerLeft: () => {
            return hasDrawerToggle ? (
              <Button
                size='icon'
                variant='ghost'
                className='mr-2'
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
                <Menu color={colorsTheme.primary[500]} />
              </Button>
            ) : (
              <Button size='icon' className='mr-2' variant='ghost' onPress={() => router.back()}>
                <ArrowLeft color={colorsTheme.primary[500]} />
              </Button>
            );
          },
          statusBarColor: colorsTheme.card[colorScheme],
          statusBarStyle: isDarkColorScheme ? 'light' : 'dark',
          statusBarAnimation: 'fade',
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
