import { LineChart, PocketKnife, ScrollText, Settings, Swords } from 'lucide-react-native';
import i18n from '~src/i18n.config';
import { Module } from '../models/module.models';

export const getModules = (): Module[] => {
  return [
    { title: i18n.t('routing:ROUTING.COLLECTION.INITIAL'), icon: Swords, route: '/collection' },
    { title: i18n.t('routing:ROUTING.STATS.INITIAL'), icon: LineChart, route: '/stats' },
    { title: i18n.t('routing:ROUTING.NOTES.INITIAL'), icon: ScrollText, route: '/notes' },
    { title: i18n.t('routing:ROUTING.TOOLS.INITIAL'), icon: PocketKnife, route: '/tools' },
    { title: i18n.t('routing:ROUTING.SETTINGS.INITIAL'), icon: Settings, route: '/settings' },
  ];
};
