import type { PropPrice } from './propPrice.type';

export type PricesInfosData = PropPrice & {
  id?: string | undefined;
  name: string;
};
