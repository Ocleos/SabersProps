import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/_en.locale';
import fr from './locales/fr/_fr.locale';

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
    compatibilityJSON: 'v4',
    defaultNS: 'common',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: 'fr',
    ns: ['common'],
    resources: {
      en,
      fr,
    },
    returnNull: false,
    supportedLngs: ['fr', 'en'],
  });

export const changeLanguage = (lang: string) => {
  dayjs.locale(lang);
  i18n.changeLanguage(lang);
};

export default i18n;
