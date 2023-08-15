import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerLayout from '@src/components/layout/drawerLayout.component';
import { Drawer } from 'expo-router/drawer';
import { IIconProps, Icon, useColorModeValue, useToken } from 'native-base';
import { useTranslation } from 'react-i18next';

const defaultIconProps: IIconProps = {
  size: 8,
};

export default () => {
  const { t } = useTranslation(['routing']);

  return (
    <Drawer
      drawerContent={(props) => <DrawerLayout {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: useToken('colors', 'primary.500'),
        drawerInactiveTintColor: useToken('colors', useColorModeValue('darkText', 'lightText')),
        drawerStyle: {
          backgroundColor: useToken('colors', useColorModeValue('light.50', 'dark.50')),
        },
      }}
    >
      <Drawer.Screen
        name='collection'
        options={{
          drawerLabel: t('routing:ROUTING.COLLECTION.INITIAL'),
          drawerIcon: (props) => (
            <Icon as={MaterialCommunityIcons} name='sword-cross' color={props.color} {...defaultIconProps} />
          ),
        }}
      />

      <Drawer.Screen
        name='stats'
        options={{
          drawerLabel: t('routing:ROUTING.STATS.INITIAL'),
          drawerIcon: (props) => <Icon as={FontAwesome} name='pie-chart' color={props.color} {...defaultIconProps} />,
        }}
      />

      <Drawer.Screen
        name='tools'
        options={{
          drawerLabel: t('routing:ROUTING.TOOLS.INITIAL'),
          drawerIcon: (props) => (
            <Icon as={MaterialCommunityIcons} name='tools' color={props.color} {...defaultIconProps} />
          ),
        }}
      />

      <Drawer.Screen
        name='settings'
        options={{
          drawerLabel: t('routing:ROUTING.SETTINGS.INITIAL'),
          drawerIcon: (props) => <Icon as={FontAwesome} name='gear' color={props.color} {...defaultIconProps} />,
        }}
      />
    </Drawer>
  );
};
