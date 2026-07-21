import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Folder } from '../types/folder.type';

type FoldersState = {
  selectedFolder?: Folder;

  setSelectedFolder: (folder?: Folder) => void;
};

export const useFoldersStore = create<FoldersState>()(
  devtools((set) => ({
    selectedFolder: undefined,

    setSelectedFolder: (folder?: Folder) => {
      set((state) => ({ ...state, selectedFolder: folder }));
    },
  })),
);
