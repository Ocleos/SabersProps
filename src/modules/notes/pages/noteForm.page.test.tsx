import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import type { Note } from '~src/modules/notes/types/note.type';
import { fireEvent, flushAsync, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import NoteFormPage from './noteForm.page';

const mockBack = jest.fn();
const mockPostData = jest.fn().mockResolvedValue(undefined);
const mockPutData = jest.fn().mockResolvedValue(undefined);

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useRouter: () => ({ back: mockBack }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  NOTES_TABLE: 'notes',
  postData: (...args: unknown[]) => mockPostData(...args),
  putData: (...args: unknown[]) => mockPutData(...args),
}));

const existingNote: Note = {
  description: 'Remember to order a new blade.',
  id: 'note-1',
  title: 'Graflex maintenance',
};

beforeEach(() => {
  useNotesStore.setState(useNotesStore.getInitialState(), true);
});

describe('NoteFormPage', () => {
  it('renders empty fields in add mode', async () => {
    await renderWithProviders(<NoteFormPage />);

    expect(screen.getByPlaceholderText('Titre').props.value).toBe('');
  });

  it('pre-fills the fields with the selected note in edit mode', async () => {
    useNotesStore.getState().setSelectedNote(existingNote);
    await renderWithProviders(<NoteFormPage />);

    expect(screen.getByPlaceholderText('Titre').props.value).toBe('Graflex maintenance');
  });

  it('creates a new note and navigates back on save', async () => {
    await renderWithProviders(<NoteFormPage />);

    fireEvent.changeText(screen.getByPlaceholderText('Titre'), 'New note');
    fireEvent.changeText(screen.getByPlaceholderText('Description'), 'New note description');
    await flushAsync();
    fireEvent.press(screen.getByText('Enregistrer'));

    await waitFor(() =>
      expect(mockPostData).toHaveBeenCalledWith('notes', { description: 'New note description', title: 'New note' }),
    );
    await waitFor(() => expect(mockBack).toHaveBeenCalledTimes(1));
  });
});
