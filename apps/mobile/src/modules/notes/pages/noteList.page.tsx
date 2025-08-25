import { useIsFocused } from '@react-navigation/native';
import { Button, Icon } from '@sabersprops/ui';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { View } from 'react-native';
import EmptyComponent from '~src/components/empty/empty.component';
import NoteCardComponent from '~src/modules/notes/components/noteList/noteCard.component';
import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import { appRoutes } from '~src/router/routes.utils';
import { notesKeys } from '~src/utils/queryKeys.utils';
import { getData, NOTES_TABLE } from '~src/utils/supabase.utils';
import type { Note } from '../models/note.model';

const NoteListPage: React.FC = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const { isLoading, data, refetch } = useQuery({
    queryFn: async () => await getData<Note>(NOTES_TABLE),
    queryKey: notesKeys.root(),
    subscribed: isFocused,
  });

  const { setSelectedNote } = useNotesStore();

  return (
    <>
      <FlashList
        data={data}
        estimatedItemSize={160}
        ItemSeparatorComponent={() => <View className='h-4' />}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        ListEmptyComponent={() => <EmptyComponent />}
        onRefresh={() => refetch()}
        refreshing={isLoading}
        renderItem={({ item }) => <NoteCardComponent note={item} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      <Button
        onPress={() => {
          setSelectedNote(undefined);
          router.push(appRoutes.notes.form);
        }}
        size='fab'>
        <Icon as={PlusIcon} className='text-primary-foreground' />
      </Button>
    </>
  );
};

export default NoteListPage;
