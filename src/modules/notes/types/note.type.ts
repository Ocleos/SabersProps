import * as yup from 'yup';
import { MAX_LENGTH } from '~src/utils/validator.utils';

export type Note = {
  id?: string | undefined;
  title: string;
  description: string;
};

export const noteSchema: yup.ObjectSchema<Note> = yup.object().shape({
  description: yup.string().required(),
  id: yup.string().optional(),
  title: yup.string().required().max(MAX_LENGTH),
});
