import type { PropState } from './propState.type';

type CountByState = {
  values: number[];
  total: number;
};

export type StateRepartition = Record<PropState, CountByState>;
type TypeRepartition = number[];

export type Repartition = {
  states: StateRepartition;
  types: TypeRepartition;
  total: number;
};
