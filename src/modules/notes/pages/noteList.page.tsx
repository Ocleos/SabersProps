import { Box, Fab, FabIcon, VStack } from '@gluestack-ui/themed';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React from 'react';
import useSWR from 'swr';
import EmptyComponent from '~src/components/empty/empty.component';
import { NOTES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import NoteCardComponent from '../components/noteList/noteCard.component';
import { Note } from '../models/note.model';
import { useNotesStore } from '../stores/notes.store';

const NoteListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(NOTES_URL_ENDPOINT, getData<Note>);

  const { setSelectedNote } = useNotesStore();

  return (
    <>
      <VStack flex={1}>
        <FlashList
          data={data}
          renderItem={({ item }) => <NoteCardComponent note={item} />}
          estimatedItemSize={160}
          ListEmptyComponent={() => <EmptyComponent />}
          ItemSeparatorComponent={() => <Box h={'$4'} />}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onRefresh={() => mutate()}
          refreshing={isLoading}
        />
      </VStack>

      <Fab
        size='lg'
        onPress={() => {
          setSelectedNote(undefined);
          router.push('/notes/form');
        }}
      >
        <FabIcon as={Plus} size='xl' />
      </Fab>
    </>
  );
};

export default NoteListPage;
