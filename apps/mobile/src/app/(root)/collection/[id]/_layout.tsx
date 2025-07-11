import { fontFamily } from '@sabersprops/ui';
import { Stack, Tabs } from 'expo-router';
import { CpuIcon, InfoIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontFamily: fontFamily.exo2, fontSize: 14 },
        }}>
        <Tabs.Screen
          name='informations'
          options={{
            tabBarIcon: (props) => <InfoIcon color={props.color} size={props.size} />,
            tabBarLabel: t('routing:ROUTING.COLLECTION.INFORMATIONS'),
          }}
        />
        <Tabs.Screen
          name='components'
          options={{
            tabBarIcon: (props) => <CpuIcon color={props.color} size={props.size} />,
            tabBarLabel: t('routing:ROUTING.COLLECTION.COMPONENTS'),
          }}
        />
      </Tabs>
    </>
  );
};
