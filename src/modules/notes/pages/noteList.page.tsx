import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';
import useSWR from 'swr';
import { Button } from '~rnr/ui/button';
import EmptyComponent from '~src/components/empty/empty.component';
import { appRoutes } from '~src/router/routes.utils';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { NOTES_URL_ENDPOINT, getData } from '~src/utils/supabase.utils';
import NoteCardComponent from '../components/noteList/noteCard.component';
import type { Note } from '../models/note.model';
import { useNotesStore } from '../stores/notes.store';

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
        <Plus color={colorsTheme.textForeground} />
      </Button>
    </>
  );
};

export default NoteListPage;
