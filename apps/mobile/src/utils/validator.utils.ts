import * as yup from 'yup';
import { setLocale } from 'yup';
import i18n from '~src/i18n.config';

export const MAX_LENGTH = 100;

export const PASSWORD_VALIDATION_RULES = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_\W]).{8,}$/;

yup.addMethod(yup.string, 'password', function password() {
  return this.matches(PASSWORD_VALIDATION_RULES, i18n.t('auth:VALIDATION.WEAK_PASSWORD'));
});

setLocale({
  mixed: {
    default: () => i18n.t('common:VALIDATION.DEFAULT'),
    notType: (value) => {
      switch (value.type) {
        case 'number':
          return i18n.t('common:VALIDATION.NUMBER');
        default:
          return i18n.t('common:VALIDATION.DEFAULT');
      }
    },
    required: () => i18n.t('common:VALIDATION.REQUIRED'),
  },
  number: {
    max: ({ max }) => i18n.t('common:VALIDATION.MAX', { max }),
    min: ({ min }) => i18n.t('common:VALIDATION.MIN', { min }),
    negative: () => i18n.t('common:VALIDATION.NEGATIVE'),
    positive: () => i18n.t('common:VALIDATION.POSITIVE'),
  },
  string: {
    email: () => i18n.t('common:VALIDATION.EMAIL'),
    max: ({ max }) => i18n.t('common:VALIDATION.TOO_LONG', { count: max }),
    min: ({ min }) => i18n.t('common:VALIDATION.TOO_SHORT', { count: min }),
  },
});

// Update TS definitions
declare module 'yup' {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    password(): StringSchema<TType, TContext, TDefault, TFlags>;
  }
}
