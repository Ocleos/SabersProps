import { filter, sortBy } from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { searchValueInObject } from '~src/utils/arrays.utils';
import { PropComponent } from '../models/propComponent.model';
import { PropDetail } from '../models/propDetail.model';

interface IPropDetailState {
  propDetail?: PropDetail;
  components: PropComponent[];
  selectedComponent?: PropComponent;
  isActionsOpen: boolean;
  searchValue: string;

  updatePropDetail: (data: PropDetail | undefined) => void;
  updateComponents: (data: PropComponent[]) => void;
  setSelectedComponent: (component?: PropComponent) => void;
  setIsActionsOpen: (isOpen: boolean) => void;
  setSearchValue: (search: string) => void;
}

export const usePropDetailStore = create<IPropDetailState>()(
  devtools((set) => ({
    propDetail: undefined,
    components: [],
    selectedComponent: undefined,
    isActionsOpen: false,
    searchValue: '',

    updatePropDetail: (data: PropDetail | undefined) => {
      set((state) => ({ ...state, propDetail: data }));
    },

    updateComponents: (data: PropComponent[]) => {
      set((state) => {
        const filteredData = filter(data, (item) => {
          const isSearchIncluded = searchValueInObject(state.searchValue, item as Object);

          return isSearchIncluded;
        });
        const sortedData = sortBy(filteredData, ['date', 'label']);

        return { ...state, components: sortedData };
      });
    },

    setSelectedComponent: (propComponent?: PropComponent) => {
      set((state) => ({ ...state, selectedComponent: propComponent }));
    },

    setIsActionsOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isActionsOpen: isOpen }));
    },

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, searchValue: search }));
    },
  })),
);
