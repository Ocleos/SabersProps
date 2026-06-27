import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Prop } from '~src/models/prop.model';
import { defaultPropFilters, type PropFilters } from '~src/models/propFilters.model';
import type { PropState } from '~src/models/propState.model';
import type { PropType } from '~src/models/propType.model';
import { addOrRemove } from '~src/utils/arrays.utils';

interface ICollectionState {
  filters: PropFilters;
  selectedProp?: Prop;
  setSearchValue: (search: string) => void;
  setSelectedProp: (prop?: Prop) => void;

  updateProps: (data: Prop[], filters: PropFilters) => void;
  updateStateFilter: (propState: PropState) => void;
  updateTypeFilter: (type: PropType) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    filters: defaultPropFilters,
    selectedProp: undefined,

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, filters: { ...state.filters, searchValue: search } }));
    },

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    updateStateFilter: (propState: PropState) => {
      set((state) => ({
        ...state,
        filters: { ...state.filters, statesFilter: addOrRemove(state.filters.statesFilter, propState) },
      }));
    },

    updateTypeFilter: (type: PropType) => {
      set((state) => ({
        ...state,
        filters: { ...state.filters, typesFilter: addOrRemove(state.filters.typesFilter, type) },
      }));
    },
  })),
);
