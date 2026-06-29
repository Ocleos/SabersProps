import * as yup from 'yup';

export type PropSellingPrice = {
  id?: string | undefined;
  sellingPrice: number;
};

export const propSellingPriceSchema: yup.ObjectSchema<PropSellingPrice> = yup.object().shape({
  id: yup.string().optional(),
  sellingPrice: yup.number().required().min(0),
});
