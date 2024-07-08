import { alphabetical } from 'radash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { searchValueInObject } from '~src/utils/arrays.utils';
import type { PropComponent } from '../models/propComponent.model';
import type { PropDetail } from '../models/propDetail.model';

interface IPropDetailState {
  propDetail?: PropDetail;
  components: PropComponent[];
  selectedComponent?: PropComponent;
  searchValue: string;

  updatePropDetail: (data: PropDetail | undefined) => void;
  updateComponents: (data: PropComponent[], search: string) => void;
  setSelectedComponent: (component?: PropComponent) => void;
  setSearchValue: (search: string) => void;
}

export const usePropDetailStore = create<IPropDetailState>()(
  devtools((set) => ({
    propDetail: undefined,
    components: [],
    selectedComponent: undefined,
    searchValue: '',

    updatePropDetail: (data: PropDetail | undefined) => {
      set((state) => ({ ...state, propDetail: data }));
    },

    updateComponents: (data: PropComponent[], search: string) => {
      set((state) => {
        const filteredData = data.filter((item) => {
          const isSearchIncluded = searchValueInObject(search, item);

          return isSearchIncluded;
        });
        const sortedData = alphabetical(filteredData, (value) => value.date);

        return { ...state, components: sortedData };
      });
    },

    setSelectedComponent: (propComponent?: PropComponent) => {
      set((state) => ({ ...state, selectedComponent: propComponent }));
    },

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, searchValue: search }));
    },
  })),
);
