import { PropState } from '~src/models/propState.model';

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

export const initialData: Repartition = {
  total: 0,
  types: [0, 0, 0],
  states: {
    1: { total: 0, values: [0, 0, 0] },
    2: { total: 0, values: [0, 0, 0] },
    3: { total: 0, values: [0, 0, 0] },
    4: { total: 0, values: [0, 0, 0] },
    5: { total: 0, values: [0, 0, 0] },
    6: { total: 0, values: [0, 0, 0] },
    7: { total: 0, values: [0, 0, 0] },
    8: { total: 0, values: [0, 0, 0] },
  },
};
