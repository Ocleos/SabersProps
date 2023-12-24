import { PropPrice } from '~src/models/propPrice.model';

export type PricesInfosData = PropPrice & {
  id?: string | undefined;
  name: string;
};
