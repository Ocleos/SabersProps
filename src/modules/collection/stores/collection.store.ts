import { filter, includes, sortBy } from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Prop } from '~src/models/prop.model';
import { PropFilters, defaultPropFilters } from '~src/models/propFilters.model';
import { PropState } from '~src/models/propState.model';
import { PropType } from '~src/models/propType.model';
import { addOrRemove, searchValueInObject } from '~src/utils/arrays.utils';

interface ICollectionState {
  props: Prop[];
  selectedProp?: Prop;
  isFiltersOpen: boolean;
  filters: PropFilters;

  updateProps: (data: Prop[], filters: PropFilters) => void;
  setSelectedProp: (prop?: Prop) => void;
  setSearchValue: (search: string) => void;
  setIsFiltersOpen: (isOpen: boolean) => void;

  updateTypeFilter: (type: PropType) => void;
  updateStateFilter: (propState: PropState) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    props: [],
    selectedProp: undefined,
    isFiltersOpen: false,
    filters: defaultPropFilters,

    updateProps: (data: Prop[], filters: PropFilters) => {
      set((state) => {
        const filteredData = filter(data, (item) => {
          const isTypeIncluded = includes(filters.typesFilter, item.type);
          const isStateIncluded = includes(filters.statesFilter, item.state);
          const isSearchIncluded = searchValueInObject(filters.searchValue, item);

          return isSearchIncluded && isStateIncluded && isTypeIncluded;
        });
        const sortedData = sortBy(filteredData, ['name']);

        return { ...state, props: sortedData };
      });
    },

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    setIsFiltersOpen: (isOpen) => {
      set((state) => ({ ...state, isFiltersOpen: isOpen }));
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
