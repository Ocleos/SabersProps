import type { Note } from '~src/modules/notes/types/note.type';
import { renderWithProviders, screen } from '~src/test/render.utils';
import NoteCard from './noteCard.component';

jest.mock('expo-router', () => ({
  useRouter: () => ({ navigate: jest.fn() }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
}));

const note: Note = {
  description: 'Remember to order a new blade.',
  id: 'note-1',
  title: 'Graflex maintenance',
};

describe('NoteCard', () => {
  it('renders the title and description', async () => {
    await renderWithProviders(<NoteCard note={note} />);

    expect(screen.getByText('Graflex maintenance')).toBeTruthy();
    expect(screen.getByText('Remember to order a new blade.')).toBeTruthy();
  });
});
