import * as yup from 'yup';
import { MAX_LENGTH } from '~src/utils/validator.utils';

export type Folder = {
  id?: string | undefined;
  name: string;
  order: number;
};

export const folderSchema: yup.ObjectSchema<Folder> = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required().max(MAX_LENGTH),
  order: yup.number().required(),
});
