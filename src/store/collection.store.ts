import { Prop } from '@src/models/prop.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICollectionState {
  selectedProp?: Prop;
  isDeleteModalOpen: boolean;
  setSelectedProp: (prop?: Prop) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    selectedProp: undefined,
    isDeleteModalOpen: false,

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    setIsDeleteModalOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isDeleteModalOpen: isOpen }));
    },
  })),
);
