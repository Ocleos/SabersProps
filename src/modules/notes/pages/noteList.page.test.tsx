import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import type { Note } from '~src/modules/notes/types/note.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import NoteListPage from './noteList.page';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useIsFocused: () => true,
  useRouter: () => ({ push: mockPush }),
}));

const notes: Note[] = [
  { description: 'Remember to order a new blade.', id: 'note-1', title: 'Graflex maintenance' },
  { description: 'Design a new hilt.', id: 'note-2', title: 'ANH hilt' },
];

const mockGetData = jest.fn().mockResolvedValue(notes);

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  NOTES_TABLE: 'notes',
}));

beforeEach(() => {
  useNotesStore.setState(useNotesStore.getInitialState(), true);
});

describe('NoteListPage', () => {
  it('renders every note once loaded', async () => {
    await renderWithProviders(<NoteListPage />);

    await waitFor(() => expect(screen.getByText('Graflex maintenance')).toBeTruthy());
    expect(screen.getByText('ANH hilt')).toBeTruthy();
  });

  it('clears the selected note and navigates to the form when the FAB is pressed', async () => {
    useNotesStore.getState().setSelectedNote(notes[0]);
    await renderWithProviders(<NoteListPage />);
    await waitFor(() => expect(mockGetData).toHaveBeenCalled());

    // Each note card also renders an ActionsMenu trigger button — the FAB is the last button in
    // the tree.
    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);

    expect(useNotesStore.getState().selectedNote).toBeUndefined();
    expect(mockPush).toHaveBeenCalledWith('/notes/form');
  });
});
