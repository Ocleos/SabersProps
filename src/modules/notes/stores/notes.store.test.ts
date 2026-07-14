import type { Note } from '../types/note.type';
import { useNotesStore } from './notes.store';

const getInitialState = () => useNotesStore.getInitialState();

beforeEach(() => {
  useNotesStore.setState(getInitialState(), true);
});

describe('useNotesStore', () => {
  it('starts with no selected note', () => {
    expect(useNotesStore.getState().selectedNote).toBeUndefined();
  });

  it('sets and clears the selected note', () => {
    const note = { id: '1', title: 'Todo' } as Note;

    useNotesStore.getState().setSelectedNote(note);
    expect(useNotesStore.getState().selectedNote).toBe(note);

    useNotesStore.getState().setSelectedNote(undefined);
    expect(useNotesStore.getState().selectedNote).toBeUndefined();
  });
});
