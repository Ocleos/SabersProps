import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Note } from '~src/modules/notes/models/note.model';

interface INotesState {
  selectedNote?: Note;

  setSelectedNote: (note?: Note) => void;
}

export const useNotesStore = create<INotesState>()(
  devtools((set) => ({
    selectedNote: undefined,

    setSelectedNote: (note?: Note) => {
      set((state) => ({ ...state, selectedNote: note }));
    },
  })),
);
