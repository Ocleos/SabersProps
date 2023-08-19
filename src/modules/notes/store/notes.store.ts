import { Note } from '../models/note.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface INotesState {
  selectedNote?: Note;
  isActionsOpen: boolean;
  isDeleteModalOpen: boolean;

  setSelectedNote: (note?: Note) => void;
  setIsActionsOpen: (isOpen: boolean) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export const useNotesStore = create<INotesState>()(
  devtools((set) => ({
    selectedNote: undefined,
    isActionsOpen: false,
    isDeleteModalOpen: false,

    setSelectedNote: (note?: Note) => {
      set((state) => ({ ...state, selectedNote: note }));
    },

    setIsActionsOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isActionsOpen: isOpen }));
    },

    setIsDeleteModalOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isDeleteModalOpen: isOpen }));
    },
  })),
);
