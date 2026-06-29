import LucideIcons from '@react-native-vector-icons/lucide';
import { NativeTabs } from 'expo-router/build/native-tabs';
import { useThemeColor } from 'heroui-native/hooks';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  const [accentColor, accentSoftColor] = useThemeColor(['accent', 'accent-soft']);

  const swordsIcon = LucideIcons.getImageSourceSync('swords', 24, 'black');
  const scrollTextIcon = LucideIcons.getImageSourceSync('scroll-text', 24, 'black');
  const pocketKnifeIcon = LucideIcons.getImageSourceSync('pocket-knife', 24, 'black');
  const profileIcon = LucideIcons.getImageSourceSync('contact', 24, 'black');

  return (
    <NativeTabs
      indicatorColor={accentSoftColor}
      labelStyle={{ fontFamily: 'Exo2_500Medium' }}
      rippleColor={accentSoftColor}
      tintColor={accentColor}>
      <NativeTabs.Trigger name='collection'>
        <NativeTabs.Trigger.Label>{t('collection:ROUTING.COLLECTION')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={swordsIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='notes'>
        <NativeTabs.Trigger.Label>{t('notes:ROUTING.TITLE')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={scrollTextIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='tools'>
        <NativeTabs.Trigger.Label>{t('tools:ROUTING.TITLE')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={pocketKnifeIcon} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='profile'>
        <NativeTabs.Trigger.Label>{t('profile:ROUTING.TITLE')}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={profileIcon} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};
