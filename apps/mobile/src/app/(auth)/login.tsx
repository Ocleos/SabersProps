import { colorsTheme, useColorScheme } from '@sabersprops/ui';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import LoginPage from '~src/modules/auth/pages/login.page';

export default () => {
  const { isDarkColorScheme, colorScheme } = useColorScheme();

  return (
    <View className='flex-1 p-4'>
      <Stack.Screen
        options={{
          headerShown: false,
          statusBarAnimation: 'fade',
          statusBarBackgroundColor: colorsTheme.card[colorScheme],
          statusBarStyle: isDarkColorScheme ? 'light' : 'dark',
        }}
      />
      <LoginPage />
    </View>
  );
};
