import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Note } from '../models/note.model';

interface INotesState {
  selectedNote?: Note;
  isActionsOpen: boolean;

  setSelectedNote: (note?: Note) => void;
  setIsActionsOpen: (isOpen: boolean) => void;
}

export const useNotesStore = create<INotesState>()(
  devtools((set) => ({
    selectedNote: undefined,
    isActionsOpen: false,

    setSelectedNote: (note?: Note) => {
      set((state) => ({ ...state, selectedNote: note }));
    },

    setIsActionsOpen: (isOpen: boolean) => {
      set((state) => ({ ...state, isActionsOpen: isOpen }));
    },
  })),
);
