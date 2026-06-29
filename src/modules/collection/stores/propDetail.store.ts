import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PropComponent } from '../types/propComponent.type';
import type { PropDetail } from '../types/propDetail.type';

type PropDetailState = {
  propDetail?: PropDetail;
  searchValue: string;
  selectedComponent?: PropComponent;
  setSearchValue: (search: string) => void;
  setSelectedComponent: (component?: PropComponent) => void;

  updatePropDetail: (data: PropDetail | undefined) => void;
};

export const usePropDetailStore = create<PropDetailState>()(
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
