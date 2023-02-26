import PageLayout from '@src/components/layout/pageLayout.component';
import { changeLanguage } from '@src/i18n.config';
import { Button, useColorMode } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { t } = useTranslation(['common', 'settings']);
  const { toggleColorMode } = useColorMode();

  return (
    <PageLayout stackOptions={{ title: t('settings:SETTINGS.TITLE') ?? '' }} isScrollable>
      <Button onPress={() => changeLanguage('fr')} colorScheme='primary'>
        Français
      </Button>
      <Button onPress={() => changeLanguage('en')} colorScheme='secondary'>
        English
      </Button>

      <Button onPress={toggleColorMode} colorScheme='tertiary'>
        Theme
      </Button>
    </PageLayout>
  );
};

export default Settings;
