import * as yup from 'yup';
import { MAX_LENGTH } from '~src/utils/validator.utils';

export type NewAccount = {
  email: string;
  password: string;
  displayName: string;
};

export const newAccountSchema: yup.ObjectSchema<NewAccount> = yup.object().shape({
  displayName: yup.string().required().max(MAX_LENGTH),
  email: yup.string().required().email(),
  password: yup.string().required().password(),
});
