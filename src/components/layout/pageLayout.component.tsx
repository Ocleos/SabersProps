import { Stack } from 'expo-router';
import { KeyboardAvoidingView, ScrollView, View, type ViewProps } from 'react-native';

type PageLayoutProps = {
  children: React.ReactNode;
  viewProps?: ViewProps;
  isScrollable?: boolean;
  title?: string;
};

const PageLayout: React.FC<PageLayoutProps> = ({ viewProps, isScrollable = true, children, title }) => {
  return (
    <KeyboardAvoidingView behavior={'padding'} className='flex-1 bg-background'>
      <Stack.Screen
        options={{
          statusBarAnimation: 'fade',
          title,
        }}
      />

      {isScrollable ? (
        <ScrollView
          className='flex-1 p-4'
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          {...viewProps}>
          <View className='pb-8'>{children}</View>
        </ScrollView>
      ) : (
        <View className='flex-1 p-4' {...viewProps}>
          {children}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default PageLayout;
