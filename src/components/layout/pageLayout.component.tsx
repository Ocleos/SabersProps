import { DrawerToggleButton } from '@react-navigation/drawer';
import { HeaderBackButton } from '@react-navigation/elements';
import { Stack, router } from 'expo-router';
import { Box, IScrollViewProps, ScrollView, View, useColorModeValue, useToken } from 'native-base';
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types';

interface Props {
  children: React.ReactNode;
  title?: string;
  isScrollable?: boolean;
  scrollViewProps?: IScrollViewProps;
  viewProps?: IViewProps;
}

const PageLayout: React.FC<Props> = (props) => {
  return (
    <Box p={4} backgroundColor={useColorModeValue('light.100', 'dark.100')} flex={1}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
          },
          headerTintColor: useToken('colors', useColorModeValue('darkText', 'lightText')),
          statusBarColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
          statusBarStyle: useColorModeValue('dark', 'light'),
          statusBarAnimation: 'fade',
          headerLeft: (props) =>
            props.canGoBack ? (
              <HeaderBackButton {...props} onPress={() => router.back()} />
            ) : (
              <DrawerToggleButton {...props} />
            ),
          title: props.title,
        }}
      />

      {props.isScrollable ? (
        <ScrollView h={'full'} {...props.scrollViewProps}>
          {props.children}
        </ScrollView>
      ) : (
        <View h={'full'} {...props.viewProps}>
          {props.children}
        </View>
      )}
    </Box>
  );
};

export default PageLayout;
