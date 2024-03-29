import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Drawer } from 'expo-router/drawer';
import { Home, LineChart, PocketKnife, ScrollText, Settings, Swords } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerLayout from '~src/components/layout/drawerLayout.component';

export default () => {
  const { t } = useTranslation(['routing']);

  const drawer = (
    <Drawer
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { fontFamily: 'Exo2_500Medium' },
      }}>
      <Drawer.Screen
        name='home'
        options={{
          drawerLabel: t('routing:ROUTING.HOME.INITIAL'),
          drawerIcon: (props) => <Home color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='collection'
        options={{
          drawerLabel: t('routing:ROUTING.COLLECTION.INITIAL'),
          drawerIcon: (props) => <Swords color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='stats'
        options={{
          drawerLabel: t('routing:ROUTING.STATS.INITIAL'),
          drawerIcon: (props) => <LineChart color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='notes'
        options={{
          drawerLabel: t('routing:ROUTING.NOTES.INITIAL'),
          drawerIcon: (props) => <ScrollText color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='tools'
        options={{
          drawerLabel: t('routing:ROUTING.TOOLS.INITIAL'),
          drawerIcon: (props) => <PocketKnife color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='settings'
        options={{
          drawerLabel: t('routing:ROUTING.SETTINGS.INITIAL'),
          drawerIcon: (props) => <Settings color={props.color} size={props.size} />,
        }}
      />
    </Drawer>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>{drawer}</BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
