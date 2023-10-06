import { Center, HStack, Radio, Switch, Text, VStack, useColorMode } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '~src/i18n.config';
import { applicationVersion } from '~src/utils/platforms.utils';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation(['common', 'settings']);
  const { toggleColorMode, colorMode } = useColorMode();

  const onToggleTheme = () => {
    toggleColorMode();
  };

  return (
    <VStack space={4}>
      <HStack space={4}>
        <Text w={'2/3'}>{t('settings:SETTINGS.DARK_THEME')}</Text>
        <Switch size='lg' isChecked={colorMode === 'dark'} onToggle={onToggleTheme} m='auto' />
      </HStack>

      <HStack>
        <Text w={'2/3'}>{t('settings:SETTINGS.LANGUAGES.DESCRIPTION')}</Text>
        <Radio.Group name='language' size='lg' onChange={changeLanguage} defaultValue='fr'>
          <Radio value='fr' m={1}>
            {t('settings:SETTINGS.LANGUAGES.FRENCH')}
          </Radio>
          <Radio value='en' m={1}>
            {t('settings:SETTINGS.LANGUAGES.ENGLISH')}
          </Radio>
        </Radio.Group>
      </HStack>

      {applicationVersion && (
        <Center>
          <Text>{`v${applicationVersion}`}</Text>
        </Center>
      )}
    </VStack>
  );
};

export default SettingsPage;
