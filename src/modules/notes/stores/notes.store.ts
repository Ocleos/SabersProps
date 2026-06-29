import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Note } from '../types/note.type';

type NotesState = {
  selectedNote?: Note;

  setSelectedNote: (note?: Note) => void;
};

export const useNotesStore = create<NotesState>()(
  devtools((set) => ({
    selectedNote: undefined,

    setSelectedNote: (note?: Note) => {
      set((state) => ({ ...state, selectedNote: note }));
    },
  })),
);
