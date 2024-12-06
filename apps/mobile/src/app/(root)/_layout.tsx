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
        headerShown: false,
        drawerLabelStyle: { fontFamily: fontFamily.exo2Medium },
      }}>
      <Drawer.Screen
        name='home'
        options={{
          drawerLabel: t('routing:ROUTING.HOME.INITIAL'),
          drawerIcon: (props) => <HomeIcon color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='collection'
        options={{
          drawerLabel: t('routing:ROUTING.COLLECTION.INITIAL'),
          drawerIcon: (props) => <SwordsIcon color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='stats'
        options={{
          drawerLabel: t('routing:ROUTING.STATS.INITIAL'),
          drawerIcon: (props) => <LineChartIcon color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='notes'
        options={{
          drawerLabel: t('routing:ROUTING.NOTES.INITIAL'),
          drawerIcon: (props) => <ScrollTextIcon color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='todos'
        options={{
          drawerLabel: t('routing:ROUTING.TODOS.INITIAL'),
          drawerIcon: (props) => <ListTodoIcon color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='tools'
        options={{
          drawerLabel: t('routing:ROUTING.TOOLS.INITIAL'),
          drawerIcon: (props) => <PocketKnifeIcon color={props.color} size={props.size} />,
        }}
      />

      <Drawer.Screen
        name='settings'
        options={{
          drawerLabel: t('routing:ROUTING.SETTINGS.INITIAL'),
          drawerIcon: (props) => <SettingsIcon color={props.color} size={props.size} />,
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
