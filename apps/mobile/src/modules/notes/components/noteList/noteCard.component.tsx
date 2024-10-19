import { Card, CardContent, CardHeader, CardTitle, HStack, Text } from '@sabersprops/ui';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { Note } from '~src/modules/notes/models/note.model';
import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import { appRoutes } from '~src/router/routes.utils';
import { NOTES_URL_ENDPOINT } from '~src/utils/supabase.utils';

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
            routeEdit={appRoutes.notes.form}
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
