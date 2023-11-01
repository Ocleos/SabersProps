import { reduce } from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Prop } from '~src/models/prop.model';
import { Repartition, initialData } from '../models/repartition.model';

type RepartitionState = {
  repartition?: Repartition;

  calculateRepartition: (data: Prop[]) => void;
};

export const useRepartitionStore = create<RepartitionState>()(
  devtools((set) => ({
    repartition: undefined,

    calculateRepartition: (data: Prop[]) => {
      set((state) => {
        const values = reduce(
          data,
          (result, currentProp) => {
            const indexType = currentProp.type - 1;

            result.total += 1; // Global total
            result.types[indexType] += 1; // Total by types
            result.states[currentProp.state].total += 1; // Total by state
            result.states[currentProp.state].values[indexType] += 1; // Count by types/states

            return result;
          },
          initialData,
        );

        return { ...state, repartition: values };
      });
    },
  })),
);
