import { setLocale } from 'yup';
import i18n from '~src/i18n.config';

export const MAX_LENGTH = 100;

setLocale({
  mixed: {
    default: () => i18n.t('common:VALIDATION.DEFAULT'),
    required: () => i18n.t('common:VALIDATION.REQUIRED'),
    notType: (value) => {
      switch (value.type) {
        case 'number':
          return i18n.t('common:VALIDATION.NUMBER');
        default:
          return i18n.t('common:VALIDATION.DEFAULT');
      }
    },
  },
  number: {
    max: ({ max }) => i18n.t('common:VALIDATION.MAX', { max }),
    min: ({ min }) => i18n.t('common:VALIDATION.MIN', { min }),
    positive: () => i18n.t('common:VALIDATION.POSITIVE'),
    negative: () => i18n.t('common:VALIDATION.NEGATIVE'),
  },
  string: {
    email: () => i18n.t('common:VALIDATION.EMAIL'),
    max: ({ max }) => i18n.t('common:VALIDATION.TOO_LONG', { count: max }),
    min: ({ min }) => i18n.t('common:VALIDATION.TOO_SHORT', { count: min }),
  },
});
