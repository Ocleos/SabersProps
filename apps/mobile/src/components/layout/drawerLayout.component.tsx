import { DrawerContent, type DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { H3, HStack, Separator, colorsTheme, fontFamily } from '@sabersprops/ui';
import { LogOutIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoIcon from '~src/assets/icons/logo.icon';
import { supabase } from '~src/utils/supabase.utils';

const DrawerLayout: React.FC<DrawerContentComponentProps> = (props) => {
  const { t } = useTranslation(['auth']);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack className='items-center gap-4 p-4'>
        <View className='h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background'>
          <LogoIcon color={colorsTheme.primary[500]} />
        </View>

        <H3 className='text-primary'>SabersProps</H3>
      </HStack>

      <Separator />

      <DrawerContent {...props} />

      <Separator />

      <DrawerItem
        labelStyle={{ fontFamily: fontFamily.exo2Medium }}
        label={t('auth:LABELS.SIGN_OUT')}
        icon={(props) => <LogOutIcon color={props.color} size={props.size} />}
        onPress={() => supabase.auth.signOut()}
      />
    </SafeAreaView>
  );
};

export default DrawerLayout;
