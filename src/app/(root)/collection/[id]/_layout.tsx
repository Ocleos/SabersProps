import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import { Icon, useColorModeValue, useToken } from 'native-base';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveBackgroundColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
          tabBarInactiveBackgroundColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
          tabBarActiveTintColor: useToken('colors', 'primary.500'),
        }}
      >
        <Tabs.Screen
          name='informations'
          options={{
            tabBarLabel: t('routing:ROUTING.COLLECTION.INFORMATIONS'),
            tabBarIcon: (props) => <Icon as={MaterialCommunityIcons} name='information-outline' {...props} />,
          }}
        />
        <Tabs.Screen
          name='components'
          options={{
            tabBarLabel: t('routing:ROUTING.COLLECTION.COMPONENTS'),
            tabBarIcon: (props) => <Icon as={MaterialCommunityIcons} name='chip' {...props} />,
          }}
        />
      </Tabs>
    </>
  );
};