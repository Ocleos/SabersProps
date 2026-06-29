import * as yup from 'yup';
import { MAX_LENGTH } from '~src/utils/validator.utils';

export type PropComponent = {
  id?: string | undefined;
  idProp: string;
  seller: string;
  date: string;
  label: string;
  rate: number;
  price: number;
  fees: number;
  priceEuros: number;
  feesEuros: number;
};

export const propComponentSchema: yup.ObjectSchema<PropComponent> = yup.object().shape({
  date: yup.string().required(),
  fees: yup.number().required().min(0),
  feesEuros: yup.number().required(),
  id: yup.string().optional(),
  idProp: yup.string().defined(),
  label: yup.string().required().max(MAX_LENGTH),
  price: yup.number().required().min(0),
  priceEuros: yup.number().required(),
  rate: yup.number().required().min(0),
  seller: yup.string().required().max(MAX_LENGTH),
});
