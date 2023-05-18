import { Prop } from '@src/models/prop.model';
import { filter, some, sortBy } from 'lodash';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICollectionState {
  props: Prop[];
  selectedProp?: Prop;
  isActionsOpen: boolean;
  isDeleteModalOpen: boolean;
  searchValue: string;
  isFiltersOpen: boolean;

  updateProps: (data: Prop[]) => void;
  setSelectedProp: (prop?: Prop) => void;
  setIsActionsOpen: (isOpen: boolean) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  setSearchValue: (search: string) => void;
  setIsFiltersOpen: (isOpen: boolean) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    props: [],
    selectedProp: undefined,
    isActionsOpen: false,
    isDeleteModalOpen: false,
    searchValue: '',
    isFiltersOpen: false,

    updateProps: (data: Prop[]) => {
      set((state) => {
        const filteredData = filter(data, (item) => {
          return some(Object.values(item as Object), (property) =>
            property?.toLocaleString().toLocaleLowerCase().includes(state.searchValue),
          );
        });
        const sortedData = sortBy(filteredData, ['name']);

        return { ...state, props: sortedData };
      });
    },

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    setIsActionsOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isActionsOpen: isOpen }));
    },

    setIsDeleteModalOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isDeleteModalOpen: isOpen }));
    },

    setSearchValue: (search: string) => {
      set((state) => ({ ...state, searchValue: search }));
    },

    setIsFiltersOpen: (isOpen) => {
      set((state) => ({ ...state, isFiltersOpen: isOpen }));
    },
  })),
);
