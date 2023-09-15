import { Box, Button, ButtonIcon, ScrollView, View, useToken } from '@gluestack-ui/themed';
import { DrawerActions } from '@react-navigation/native';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { ArrowLeft, Menu } from 'lucide-react-native';
import { useContext } from 'react';
import { ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '~src/theme/themeContext.theme';

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
  const themeContext = useContext(ThemeContext);

  const router = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title,
          headerTitleStyle: { fontFamily: 'Exo2_500Medium' },
          headerLeft: () => {
            return hasDrawerToggle ? (
              <Button
                variant='link'
                size='lg'
                p={'$2'}
                w={'$11'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              >
                <ButtonIcon as={Menu} size='xl' />
              </Button>
            ) : (
              <Button variant='link' size='lg' p={'$2'} w={'$11'} onPress={() => router.back()}>
                <ButtonIcon as={ArrowLeft} size='xl' />
              </Button>
            );
          },
          statusBarColor: themeContext.isDarkTheme
            ? useToken('colors', 'backgroundDark900')
            : useToken('colors', 'backgroundLight100'),
          statusBarStyle: themeContext.isDarkTheme ? 'light' : 'dark',
          statusBarAnimation: 'fade',
        }}
      />

      {isScrollable ? (
        <ScrollView flex={1} p={'$4'} {...viewProps}>
          <Box mb={'$8'}>{children}</Box>
        </ScrollView>
      ) : (
        <View flex={1} p={'$4'} {...viewProps}>
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export default PageLayout;
