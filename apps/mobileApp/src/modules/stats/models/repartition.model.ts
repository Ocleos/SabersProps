import type { PropState } from '~src/models/propState.model';

export type CountByState = {
  values: number[];
  total: number;
};

export type StateRepartition = Record<PropState, CountByState>;
export type TypeRepartition = number[];

export type Repartition = {
  states: StateRepartition;
  types: TypeRepartition;
  total: number;
};
