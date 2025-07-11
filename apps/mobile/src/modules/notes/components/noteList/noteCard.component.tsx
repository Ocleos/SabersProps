import { Card, CardContent, CardHeader, CardTitle, HStack, Text } from '@sabersprops/ui';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import type { Note } from '~src/modules/notes/models/note.model';
import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import { appRoutes } from '~src/router/routes.utils';
import { notesKeys } from '~src/utils/queryKeys.utils';
import { NOTES_TABLE } from '~src/utils/supabase.utils';

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
            idSelected={selectedNote?.id}
            invalidateQueryKey={notesKeys.root()}
            nameSelected={selectedNote?.title}
            onActionSelected={() => setSelectedNote(note)}
            resetSelected={() => setSelectedNote(undefined)}
            routeEdit={appRoutes.notes.form}
            tableName={NOTES_TABLE}
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
