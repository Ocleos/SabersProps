import {
  LineChartIcon,
  ListTodoIcon,
  PocketKnifeIcon,
  ScrollTextIcon,
  SettingsIcon,
  SwordsIcon,
} from 'lucide-react-native';
import i18n from '~src/i18n.config';
import type { Module } from '~src/modules/home/models/module.model';
import { appRoutes } from '~src/router/routes.utils';

export const getModules = (): Module[] => {
  return [
    {
      icon: SwordsIcon,
      id: 'collection',
      route: appRoutes.collection.root,
      title: i18n.t('routing:ROUTING.COLLECTION.INITIAL'),
    },
    { icon: LineChartIcon, id: 'stats', route: appRoutes.stats, title: i18n.t('routing:ROUTING.STATS.INITIAL') },
    { icon: ScrollTextIcon, id: 'notes', route: appRoutes.notes.root, title: i18n.t('routing:ROUTING.NOTES.INITIAL') },
    { icon: ListTodoIcon, id: 'todos', route: appRoutes.todos, title: i18n.t('routing:ROUTING.TODOS.INITIAL') },
    { icon: PocketKnifeIcon, id: 'tools', route: appRoutes.tools.root, title: i18n.t('routing:ROUTING.TOOLS.INITIAL') },
    {
      icon: SettingsIcon,
      id: 'settings',
      route: appRoutes.settings,
      title: i18n.t('routing:ROUTING.SETTINGS.INITIAL'),
    },
  ];
};
