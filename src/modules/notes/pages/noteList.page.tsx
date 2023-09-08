import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Fab, Icon, VStack } from 'native-base';
import useSWR from 'swr';
import ActionsMenu from '~src/components/actionSheet/actionsMenu.component';
import EmptyComponent from '~src/components/empty/empty.component';
import { NOTES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import NoteCardComponent from '../components/noteList/noteCard.component';
import { Note } from '../models/note.model';
import { useNotesStore } from '../store/notes.store';

const NoteListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(NOTES_URL_ENDPOINT, getData<Note>);

  const { selectedNote, setSelectedNote, isActionsOpen, setIsActionsOpen } = useNotesStore();

  return (
    <>
      <VStack space={2} flex={1}>
        <FlashList
          data={data}
          renderItem={({ item }) => <NoteCardComponent note={item} />}
          estimatedItemSize={160}
          ListEmptyComponent={() => <EmptyComponent />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onRefresh={() => mutate()}
          refreshing={isLoading}
        />
      </VStack>

      <Fab
        renderInPortal={false}
        placement={'bottom-right'}
        onPress={() => {
          setSelectedNote(undefined);
          router.push('/notes/form');
        }}
        shadow={9}
        icon={<Icon as={MaterialCommunityIcons} name='plus' size='lg' />}
      />

      <ActionsMenu
        idSelected={selectedNote?.id}
        nameSelected={selectedNote?.title}
        routeEdit={'/notes/form'}
        isOpen={isActionsOpen}
        setIsOpen={setIsActionsOpen}
        setSelected={setSelectedNote}
        urlEndpoint={NOTES_URL_ENDPOINT}
      />
    </>
  );
};

export default NoteListPage;
