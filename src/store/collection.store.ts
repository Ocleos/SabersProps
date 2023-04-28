import { Prop } from '@src/models/prop.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICollectionState {
  selectedProp?: Prop;
  isActionSheetOpen: boolean;
  isDeleteModalOpen: boolean;
  setSelectedProp: (prop?: Prop) => void;
  setIsActionSheetOpen: (isOpen: boolean) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export const useCollectionStore = create<ICollectionState>()(
  devtools((set) => ({
    selectedProp: undefined,
    isActionSheetOpen: false,
    isDeleteModalOpen: false,

    setSelectedProp: (prop?: Prop) => {
      set((state) => ({ ...state, selectedProp: prop }));
    },

    setIsActionSheetOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isActionSheetOpen: isOpen }));
    },

    setIsDeleteModalOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isDeleteModalOpen: isOpen }));
    },
  })),
);
