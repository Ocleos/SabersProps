import i18n from '@src/i18n.config';
import { setLocale } from 'yup';

export const MAX_LENGTH = 100;

setLocale({
  mixed: {
    default: () => i18n.t('common:VALIDATION.DEFAULT'),
    required: () => i18n.t('common:VALIDATION.REQUIRED'),
  },
  number: {
    max: ({ max }) => i18n.t('common:VALIDATION.MAX', { max }),
    min: ({ min }) => i18n.t('common:VALIDATION.MIN', { min }),
  },
  string: {
    email: () => i18n.t('common:VALIDATION.EMAIL'),
    max: ({ max }) => i18n.t('common:VALIDATION.TOO_LONG', { count: max }),
    min: ({ min }) => i18n.t('common:VALIDATION.TOO_SHORT', { count: min }),
  },
});
