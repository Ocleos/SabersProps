import { useIsFocused } from '@react-navigation/native';
import { Button, DEFAULT_ICON_SIZE, colorsTheme } from '@sabersprops/ui';
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
import { NOTES_TABLE, getData } from '~src/utils/supabase.utils';
import type { Note } from '../models/note.model';

const NoteListPage: React.FC = () => {
  const router = useRouter();
  const isFocused = useIsFocused();

  const { isLoading, data, refetch } = useQuery({
    queryKey: notesKeys.root(),
    queryFn: async () => await getData<Note>(NOTES_TABLE),
    subscribed: isFocused,
  });

  const { setSelectedNote } = useNotesStore();

  return (
    <>
      <FlashList
        data={data}
        renderItem={({ item }) => <NoteCardComponent note={item} />}
        estimatedItemSize={160}
        ListEmptyComponent={() => <EmptyComponent />}
        ItemSeparatorComponent={() => <View className='h-4' />}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        onRefresh={() => refetch()}
        refreshing={isLoading}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      <Button
        size='fab'
        onPress={() => {
          setSelectedNote(undefined);
          router.push(appRoutes.notes.form);
        }}>
        <PlusIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
      </Button>
    </>
  );
};

export default NoteListPage;
