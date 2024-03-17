import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed';
import Card from '~src/components/card/card.component';
import ActionsMenu from '~src/components/menu/actionsMenu.component';
import { NOTES_URL_ENDPOINT } from '~src/utils/supabase.utils';
import type { Note } from '../../models/note.model';
import { useNotesStore } from '../../stores/notes.store';

type INoteCardProps = {
  note: Note;
};

const NoteCardComponent: React.FC<INoteCardProps> = ({ note }) => {
  const { setSelectedNote, selectedNote } = useNotesStore();

  return (
    <Card>
      <VStack gap={'$2'}>
        <HStack gap={'$2'}>
          <Heading flex={1} isTruncated={true} m={'auto'}>
            {note.title}
          </Heading>

          <ActionsMenu
            onActionSelected={() => setSelectedNote(note)}
            routeEdit={'/notes/form'}
            urlEndpoint={NOTES_URL_ENDPOINT}
            idSelected={selectedNote?.id}
            nameSelected={selectedNote?.title}
            resetSelected={() => setSelectedNote(undefined)}
          />
        </HStack>

        <Text numberOfLines={3}>{note.description}</Text>
      </VStack>
    </Card>
  );
};

export default NoteCardComponent;
