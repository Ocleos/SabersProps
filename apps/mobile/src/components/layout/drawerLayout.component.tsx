import { DrawerContent, type DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { fontFamily, HStack, Separator, Text, THEME } from '@sabersprops/ui';
import { LogOutIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoIcon from '~src/assets/icons/logo.icon';
import { supabase } from '~src/utils/supabase.utils';

const DrawerLayout: React.FC<DrawerContentComponentProps> = (props) => {
  const { t } = useTranslation(['auth']);
  return (
    <SafeAreaView className='flex-1'>
      <HStack className='items-center gap-4 p-4'>
        <View className='h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background'>
          <LogoIcon color={THEME.colors.primary[500]} />
        </View>

        <Text className='text-primary' variant='h3'>
          SabersProps
        </Text>
      </HStack>

      <Separator />

      <DrawerContent {...props} />

      <Separator />

      <DrawerItem
        icon={(props) => <LogOutIcon color={props.color} size={props.size} />}
        label={t('auth:LABELS.SIGN_OUT')}
        labelStyle={{ fontFamily: fontFamily.exo2Medium }}
        onPress={() => supabase.auth.signOut()}
      />
    </SafeAreaView>
  );
};

export default DrawerLayout;
