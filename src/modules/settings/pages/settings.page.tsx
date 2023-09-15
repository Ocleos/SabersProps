import { Box, Center, HStack, RadioGroup, Switch, Text, VStack } from '@gluestack-ui/themed';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RadioWrapper from '~src/components/form/radioWrapper.component';
import { changeLanguage } from '~src/i18n.config';
import { ThemeContext } from '~src/theme/themeContext.theme';
import { applicationVersion } from '~src/utils/platforms.utils';

const SettingsPage: React.FC = () => {
  const { t } = useTranslation(['common', 'settings']);
  const themeContext = useContext(ThemeContext);

  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  const onLangChange = (value: string) => {
    setSelectedLanguage(value);
    changeLanguage(value);
  };

  return (
    <VStack gap={'$4'}>
      <HStack gap={'$4'} alignItems='center'>
        <Text flex={2}>{t('settings:SETTINGS.DARK_THEME')}</Text>
        <Box flex={1} alignItems='center'>
          <Switch size='lg' value={themeContext.isDarkTheme} onToggle={themeContext.toggleTheme} />
        </Box>
      </HStack>

      <HStack gap={'$4'} alignItems='center'>
        <Text flex={2}>{t('settings:SETTINGS.LANGUAGES.DESCRIPTION')}</Text>
        <Box flex={1} alignItems='center'>
          <RadioGroup value={selectedLanguage} onChange={onLangChange}>
            <RadioWrapper value='fr' label={t('settings:SETTINGS.LANGUAGES.FRENCH')} />
            <RadioWrapper value='en' label={t('settings:SETTINGS.LANGUAGES.ENGLISH')} />
          </RadioGroup>
        </Box>
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
