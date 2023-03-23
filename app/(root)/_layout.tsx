import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import TabTitle from '@src/components/header/tabTitle.component';
import { Tabs } from 'expo-router';
import { Icon, useColorModeValue, useToken } from 'native-base';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
        tabBarActiveTintColor: useToken('colors', 'primary.500'),
        tabBarInactiveBackgroundColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
        tabBarLabel: (props) => <TabTitle title={props.children} color={props.color} />,
        tabBarStyle: {
          height: useToken('sizes', 16),
        },
      }}
    >
      <Tabs.Screen
        name="collection"
        options={{
          title: t('routing:ROUTING.COLLECTION.INITIAL') ?? '',
          tabBarIcon: (props) => <Icon as={MaterialCommunityIcons} name="sword-cross" color={props.color} size={8} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: t('routing:ROUTING.STATS.INITIAL') ?? '',
          tabBarIcon: (props) => <Icon as={FontAwesome} name="pie-chart" color={props.color} size={8} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('routing:ROUTING.SETTINGS.INITIAL') ?? '',
          tabBarIcon: (props) => <Icon as={FontAwesome} name="gear" color={props.color} size={8} />,
        }}
      />
    </Tabs>
  );
};
