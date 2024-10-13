import dayjs from 'dayjs';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/_en.locale';
import fr from './locales/fr/_fr.locale';

import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

// Localization for dayjs
require('dayjs/locale/fr');
require('dayjs/locale/en');

dayjs.locale('fr');
// Configuration of dayjs
dayjs.extend(localizedFormat);
dayjs.extend(utc);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    returnNull: false,
    compatibilityJSON: 'v3',
    resources: {
      fr,
      en,
    },
    lng: 'fr',
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    ns: ['common'],
    defaultNS: 'common',
  });

export const changeLanguage = (lang: string) => {
  dayjs.locale(lang);
  i18n.changeLanguage(lang);
};

export default i18n;
