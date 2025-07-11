import { HStack, RadioGroup, Switch, Text, useColorScheme, VStack } from '@sabersprops/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import RadioWrapper from '~src/components/form/radioWrapper.component';
import { changeLanguage } from '~src/i18n.config';
import { applicationVersion } from '~src/utils/platforms.utils';

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
          <RadioGroup onValueChange={onLanguageChange} value={selectedLanguage}>
            <RadioWrapper label={t('settings:SETTINGS.LANGUAGES.FRENCH')} onLabelPress={onLanguageChange} value='fr' />
            <RadioWrapper label={t('settings:SETTINGS.LANGUAGES.ENGLISH')} onLabelPress={onLanguageChange} value='en' />
          </RadioGroup>
        </View>
      </HStack>

      {applicationVersion && <Text className='text-center'>{`v${applicationVersion}`}</Text>}
    </VStack>
  );
};

export default SettingsPage;
