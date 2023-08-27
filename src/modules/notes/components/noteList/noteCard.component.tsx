import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Card from '@src/components/card/card.component';
import { HStack, Heading, Icon, IconButton, Text, VStack } from 'native-base';
import { Note } from '../../models/note.model';
import { useNotesStore } from '../../store/notes.store';

interface INoteCardProps {
  note: Note;
}

const NoteCardComponent: React.FC<INoteCardProps> = ({ note }) => {
  const { setSelectedNote, setIsActionsOpen } = useNotesStore();

  return (
    <Card>
      <VStack space={2}>
        <HStack space={2}>
          <Heading flex={1} isTruncated={true} m={'auto'}>
            {note.title}
          </Heading>
          <IconButton
            icon={<Icon as={MaterialCommunityIcons} name='dots-vertical' />}
            borderRadius={'full'}
            variant={'ghost'}
            size='lg'
            colorScheme={'primary'}
            onPress={() => {
              setSelectedNote(note);
              setIsActionsOpen(true);
            }}
          />
        </HStack>

        <Text noOfLines={3}>{note.description}</Text>
      </VStack>
    </Card>
  );
};

export default NoteCardComponent;
