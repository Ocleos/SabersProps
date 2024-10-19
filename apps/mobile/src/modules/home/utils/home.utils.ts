import { LineChartIcon, PocketKnifeIcon, ScrollTextIcon, SettingsIcon, SwordsIcon } from 'lucide-react-native';
import i18n from '~src/i18n.config';
import type { Module } from '~src/modules/home/models/module.models';
import { appRoutes } from '~src/router/routes.utils';

export const getModules = (): Module[] => {
  return [
    {
      id: 'collection',
      title: i18n.t('routing:ROUTING.COLLECTION.INITIAL'),
      icon: SwordsIcon,
      route: appRoutes.collection.root,
    },
    { id: 'stats', title: i18n.t('routing:ROUTING.STATS.INITIAL'), icon: LineChartIcon, route: appRoutes.stats },
    { id: 'notes', title: i18n.t('routing:ROUTING.NOTES.INITIAL'), icon: ScrollTextIcon, route: appRoutes.notes.root },
    { id: 'tools', title: i18n.t('routing:ROUTING.TOOLS.INITIAL'), icon: PocketKnifeIcon, route: appRoutes.tools.root },
    {
      id: 'settings',
      title: i18n.t('routing:ROUTING.SETTINGS.INITIAL'),
      icon: SettingsIcon,
      route: appRoutes.settings,
    },
  ];
};
