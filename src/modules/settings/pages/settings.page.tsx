import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import RadioWrapper from '~src/components/form/radioWrapper.component';
import { changeLanguage } from '~src/i18n.config';
import { useColorScheme } from '~src/theme/useColorTheme.theme';
import { applicationVersion } from '~src/utils/platforms.utils';
import { RadioGroup } from '~ui/radio-group';
import { HStack, VStack } from '~ui/stack';
import { Switch } from '~ui/switch';
import { Text } from '~ui/text';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation(['common', 'settings']);

  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();

  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const onLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    changeLanguage(value);
  };

  return (
    <VStack className='gap-4'>
      <HStack className='items-center'>
        <Text className='basis-2/3'>{t('settings:SETTINGS.DARK_THEME')}</Text>
        <View className='basis-1/3 items-center'>
          <Switch checked={isDarkColorScheme} onCheckedChange={toggleColorScheme} />
        </View>
      </HStack>

      <HStack className='items-center'>
        <Text className='basis-2/3'>{t('settings:SETTINGS.LANGUAGES.DESCRIPTION')}</Text>
        <View className='basis-1/3 items-center'>
          <RadioGroup value={selectedLanguage} onValueChange={onLanguageChange}>
            <RadioWrapper value='fr' label={t('settings:SETTINGS.LANGUAGES.FRENCH')} onLabelPress={onLanguageChange} />
            <RadioWrapper value='en' label={t('settings:SETTINGS.LANGUAGES.ENGLISH')} onLabelPress={onLanguageChange} />
          </RadioGroup>
        </View>
      </HStack>

      {applicationVersion && <Text className='text-center'>{`v${applicationVersion}`}</Text>}
    </VStack>
  );
};

export default SettingsPage;
