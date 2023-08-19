import NoteActions from '../components/noteList/noteActions.component';
import NoteCardComponent from '../components/noteList/noteCard.component';
import { Note } from '../models/note.model';
import { useNotesStore } from '../store/notes.store';
import { AntDesign } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import EmptyComponent from '@src/components/empty/empty.component';
import { NOTES_URL_ENDPOINT, getData } from '@src/utils/supabase.utils';
import { useRouter } from 'expo-router';
import { Fab, Icon, VStack } from 'native-base';
import useSWR from 'swr';

const NoteListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(NOTES_URL_ENDPOINT, getData<Note>);

  const { setSelectedNote } = useNotesStore();

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
        icon={<Icon as={AntDesign} name='plus' size='lg' />}
      />

      <NoteActions />
    </>
  );
};

export default NoteListPage;
