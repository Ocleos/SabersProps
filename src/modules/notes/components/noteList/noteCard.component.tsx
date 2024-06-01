import { Card, CardContent, CardHeader, CardTitle } from '~rnr/ui/card';
import { HStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import { NOTES_URL_ENDPOINT } from '~src/utils/supabase.utils';
import type { Note } from '../../models/note.model';
import { useNotesStore } from '../../stores/notes.store';

interface INoteCardProps {
  note: Note;
}

const NoteCardComponent: React.FC<INoteCardProps> = ({ note }) => {
  const { setSelectedNote, selectedNote } = useNotesStore();

  return (
    <Card>
      <CardHeader>
        <HStack className='items-center gap-2'>
          <CardTitle className='grow'>{note.title}</CardTitle>
          <ActionsMenu
            onActionSelected={() => setSelectedNote(note)}
            routeEdit={'/notes/form'}
            urlEndpoint={NOTES_URL_ENDPOINT}
            idSelected={selectedNote?.id}
            nameSelected={selectedNote?.title}
            resetSelected={() => setSelectedNote(undefined)}
          />
        </HStack>
      </CardHeader>
      <CardContent>
        <Text numberOfLines={3}>{note.description}</Text>
      </CardContent>
    </Card>
  );
};

export default NoteCardComponent;
