import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Stack } from 'expo-router';
import { Box, IScrollViewProps, ScrollView, useColorModeValue, useToken, View } from 'native-base';
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types';

interface Props {
  children: React.ReactNode;
  isScrollable?: boolean;
  stackOptions?: NativeStackNavigationOptions;
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
          ...props.stackOptions,
        }}
      />
      {props.isScrollable ? (
        <ScrollView {...props.scrollViewProps}>{props.children}</ScrollView>
      ) : (
        <View {...props.viewProps}>{props.children}</View>
      )}
    </Box>
  );
};

export default PageLayout;
