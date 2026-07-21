import type { Folder } from '../types/folder.type';
import { useFoldersStore } from './folders.store';

const getInitialState = () => useFoldersStore.getInitialState();

beforeEach(() => {
  useFoldersStore.setState(getInitialState(), true);
});

describe('useFoldersStore', () => {
  it('starts with no selected folder', () => {
    expect(useFoldersStore.getState().selectedFolder).toBeUndefined();
  });

  it('sets and clears the selected folder', () => {
    const folder = { id: '1', name: 'Panel A', order: 0 } as Folder;

    useFoldersStore.getState().setSelectedFolder(folder);
    expect(useFoldersStore.getState().selectedFolder).toBe(folder);

    useFoldersStore.getState().setSelectedFolder(undefined);
    expect(useFoldersStore.getState().selectedFolder).toBeUndefined();
  });
});
