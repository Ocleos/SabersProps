import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Prop } from '~src/models/prop.model';
import { type PropFilters, defaultPropFilters } from '~src/models/propFilters.model';
import type { PropState } from '~src/models/propState.model';
import type { PropType } from '~src/models/propType.model';
import { addOrRemove } from '~src/utils/arrays.utils';

interface ICollectionState {
  selectedProp?: Prop;
  filters: PropFilters;

  updateProps: (data: Prop[], filters: PropFilters) => void;
  setSelectedProp: (prop?: Prop) => void;
  setSearchValue: (search: string) => void;
  updateTypeFilter: (type: PropType) => void;
  updateStateFilter: (propState: PropState) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    selectedProp: undefined,
    filters: defaultPropFilters,

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, filters: { ...state.filters, searchValue: search } }));
    },

    updateTypeFilter: (type: PropType) => {
      set((state) => ({
        ...state,
        filters: { ...state.filters, typesFilter: addOrRemove(state.filters.typesFilter, type) },
      }));
    },

    updateStateFilter: (propState: PropState) => {
      set((state) => ({
        ...state,
        filters: { ...state.filters, statesFilter: addOrRemove(state.filters.statesFilter, propState) },
      }));
    },
  })),
);
