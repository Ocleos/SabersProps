import type { Prop } from '~src/models/prop.model';
import type { Repartition } from '~src/modules/stats/models/repartition.model';

export const calculateRepartition = (data: Prop[]) => {
  const initialData: Repartition = {
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
    total: 0,
    types: [0, 0, 0],
  };

  const values = data.reduce((result, currentProp) => {
    const indexType = currentProp.type - 1;

    result.total += 1; // Global total
    result.types[indexType] += 1; // Total by types
    result.states[currentProp.state].total += 1; // Total by state
    result.states[currentProp.state].values[indexType] += 1; // Count by types/states

    return result;
  }, initialData);

  return values;
};
