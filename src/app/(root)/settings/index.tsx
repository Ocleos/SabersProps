import PageLayout from '@src/components/layout/pageLayout.component';
import SettingsPage from '@src/modules/settings/pages/settings.page';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation(['common', 'settings']);

  return (
    <PageLayout stackOptions={{ title: t('settings:SETTINGS.TITLE') }} isScrollable={true}>
      <SettingsPage />
    </PageLayout>
  );
};
