import { LineChart, PocketKnife, ScrollText, Settings, Swords } from 'lucide-react-native';
import i18n from '~src/i18n.config';
import { appRoutes } from '~src/router/routes.utils';
import type { Module } from '../models/module.models';

export const getModules = (): Module[] => {
  return [
    {
      id: 'collection',
      title: i18n.t('routing:ROUTING.COLLECTION.INITIAL'),
      icon: Swords,
      route: appRoutes.collection.root,
    },
    { id: 'stats', title: i18n.t('routing:ROUTING.STATS.INITIAL'), icon: LineChart, route: appRoutes.stats },
    { id: 'notes', title: i18n.t('routing:ROUTING.NOTES.INITIAL'), icon: ScrollText, route: appRoutes.notes.root },
    { id: 'tools', title: i18n.t('routing:ROUTING.TOOLS.INITIAL'), icon: PocketKnife, route: appRoutes.tools.root },
    { id: 'settings', title: i18n.t('routing:ROUTING.SETTINGS.INITIAL'), icon: Settings, route: appRoutes.settings },
  ];
};
