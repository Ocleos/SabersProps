import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { fontFamily } from '@sabersprops/ui';
import { Drawer } from 'expo-router/drawer';
import {
  HomeIcon,
  LineChartIcon,
  ListTodoIcon,
  PocketKnifeIcon,
  ScrollTextIcon,
  SettingsIcon,
  SwordsIcon,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerLayout from '~src/components/layout/drawerLayout.component';

export default () => {
  const { t } = useTranslation(['routing']);

  const drawer = (
    <Drawer
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{
        drawerLabelStyle: { fontFamily: fontFamily.exo2Medium },
        headerShown: false,
      }}>
      <Drawer.Screen
        name='home'
        options={{
          drawerIcon: (props) => <HomeIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.HOME.INITIAL'),
        }}
      />

      <Drawer.Screen
        name='collection'
        options={{
          drawerIcon: (props) => <SwordsIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.COLLECTION.INITIAL'),
        }}
      />

      <Drawer.Screen
        name='stats'
        options={{
          drawerIcon: (props) => <LineChartIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.STATS.INITIAL'),
        }}
      />

      <Drawer.Screen
        name='notes'
        options={{
          drawerIcon: (props) => <ScrollTextIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.NOTES.INITIAL'),
        }}
      />

      <Drawer.Screen
        name='todos'
        options={{
          drawerIcon: (props) => <ListTodoIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.TODOS.INITIAL'),
        }}
      />

      <Drawer.Screen
        name='tools'
        options={{
          drawerIcon: (props) => <PocketKnifeIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.TOOLS.INITIAL'),
        }}
      />

      <Drawer.Screen
        name='settings'
        options={{
          drawerIcon: (props) => <SettingsIcon color={props.color} size={props.size} />,
          drawerLabel: t('routing:ROUTING.SETTINGS.INITIAL'),
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
