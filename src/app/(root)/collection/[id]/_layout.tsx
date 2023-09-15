import { Stack, Tabs } from 'expo-router';
import { Cpu, Info } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontFamily: 'Exo2_400Regular' },
        }}
      >
        <Tabs.Screen
          name='informations'
          options={{
            tabBarLabel: t('routing:ROUTING.COLLECTION.INFORMATIONS'),
            tabBarIcon: (props) => <Info color={props.color} size={props.size} />,
          }}
        />
        <Tabs.Screen
          name='components'
          options={{
            tabBarLabel: t('routing:ROUTING.COLLECTION.COMPONENTS'),
            tabBarIcon: (props) => <Cpu color={props.color} size={props.size} />,
          }}
        />
      </Tabs>
    </>
  );
};
