import * as yup from 'yup';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import type { PropState } from './propState.type';
import type { PropType } from './propType.type';

export type Prop = {
  id?: string | undefined;
  name: string;
  state: PropState;
  type: PropType;
  manufacturer: string;
  character?: string | undefined | null;
  chassisDesigner?: string | undefined | null;
  soundboard?: string | undefined | null;
};

export const propSchema: yup.ObjectSchema<Prop> = yup.object().shape({
  character: yup.string().nullable().max(MAX_LENGTH),
  chassisDesigner: yup.string().nullable().max(MAX_LENGTH),
  id: yup.string().optional(),
  manufacturer: yup.string().required().max(MAX_LENGTH),
  name: yup.string().required().max(MAX_LENGTH),
  soundboard: yup.string().nullable().max(MAX_LENGTH),
  state: yup.number().required(),
  type: yup.number().required(),
});
