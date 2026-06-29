import { Card } from 'heroui-native/card';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import { HStack } from '~src/components/ui/stack.component';
import { notesKeys } from '~src/utils/queryKeys.utils';
import { NOTES_TABLE } from '~src/utils/supabase.utils';
import { useNotesStore } from '../../stores/notes.store';
import type { Note } from '../../types/note.type';

type NoteCardProps = {
  note: Note;
};

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const { setSelectedNote, selectedNote } = useNotesStore();

  return (
    <Card>
      <Card.Header>
        <HStack className='items-center gap-2'>
          <Card.Title className='grow'>{note.title}</Card.Title>

          <ActionsMenu
            idSelected={selectedNote?.id}
            invalidateQueryKey={notesKeys.root()}
            nameSelected={selectedNote?.title}
            onActionSelected={() => setSelectedNote(note)}
            resetSelected={() => setSelectedNote(undefined)}
            routeEdit={'/notes/form'}
            tableName={NOTES_TABLE}
          />
        </HStack>
      </Card.Header>

      <Card.Body>
        <Card.Description>{note.description}</Card.Description>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
