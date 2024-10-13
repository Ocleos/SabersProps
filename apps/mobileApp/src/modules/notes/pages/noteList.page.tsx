import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { View } from 'react-native';
import useSWR from 'swr';
import { Button } from '~rnr/ui/button';
import EmptyComponent from '~src/components/empty/empty.component';
import NoteCardComponent from '~src/modules/notes/components/noteList/noteCard.component';
import type { Note } from '~src/modules/notes/models/note.model';
import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import { appRoutes } from '~src/router/routes.utils';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';
import { NOTES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';

const NoteListPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, data, mutate } = useSWR(NOTES_URL_ENDPOINT, getData<Note>);

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
        onRefresh={() => mutate()}
        refreshing={isLoading}
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
