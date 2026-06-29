import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Prop } from '../types/prop.type';
import { defaultPropFilters, type PropFilters } from '../types/propFilters.type';
import type { PropState } from '../types/propState.type';
import type { PropType } from '../types/propType.type';

type CollectionState = {
  filters: PropFilters;
  selectedProp?: Prop;

  setSearchValue: (search: string) => void;
  setSelectedProp: (prop?: Prop) => void;

  updateStateFilter: (states: Set<PropState>) => void;
  updateTypeFilter: (types: Set<PropType>) => void;
};

export const useCollectionStore = create<CollectionState>()(
  devtools((set) => ({
    filters: defaultPropFilters,
    selectedProp: undefined,

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, filters: { ...state.filters, searchValue: search } }));
    },

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    updateStateFilter: (states: Set<PropState>) => {
      set((state) => ({ ...state, filters: { ...state.filters, statesFilter: states } }));
    },

    updateTypeFilter: (types: Set<PropType>) => {
      set((state) => ({ ...state, filters: { ...state.filters, typesFilter: types } }));
    },
  })),
);
