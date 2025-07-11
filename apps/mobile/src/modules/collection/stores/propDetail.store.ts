import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PropComponent } from '~src/modules/collection/models/propComponent.model';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';

interface IPropDetailState {
  propDetail?: PropDetail;
  selectedComponent?: PropComponent;
  searchValue: string;

  updatePropDetail: (data: PropDetail | undefined) => void;
  setSelectedComponent: (component?: PropComponent) => void;
  setSearchValue: (search: string) => void;
}

export const usePropDetailStore = create<IPropDetailState>()(
  devtools((set) => ({
    propDetail: undefined,
    searchValue: '',
    selectedComponent: undefined,

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, searchValue: search }));
    },

    setSelectedComponent: (propComponent?: PropComponent) => {
      set((state) => ({ ...state, selectedComponent: propComponent }));
    },

    updatePropDetail: (data: PropDetail | undefined) => {
      set((state) => ({ ...state, propDetail: data }));
    },
  })),
);
