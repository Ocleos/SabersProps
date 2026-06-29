import { useQuery } from '@tanstack/react-query';
import { useIsFocused, useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import PageLayout from '~src/components/layout/pageLayout.component';
import FlashListWrapper from '~src/components/list/flashListWrapper.component';
import FabButton from '~src/components/ui/fabButton.component';
import { Icon } from '~src/components/ui/icon.component';
import { notesKeys } from '~src/utils/queryKeys.utils';
import { getData, NOTES_TABLE } from '~src/utils/supabase.utils';
import NoteCard from '../components/noteList/noteCard.component';
import { useNotesStore } from '../stores/notes.store';
import type { Note } from '../types/note.type';

const NoteListPage: React.FC = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const { isLoading, data, refetch } = useQuery({
    queryFn: async () => await getData<Note>(NOTES_TABLE),
    queryKey: notesKeys.root(),
    subscribed: isFocused,
  });

  const { setSelectedNote } = useNotesStore();

  return (
    <PageLayout isScrollable={false} title={t('notes:ROUTING.TITLE')}>
      <FlashListWrapper
        data={data}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        onRefresh={() => refetch()}
        refreshing={isLoading}
        renderItem={({ item }) => <NoteCard note={item} />}
      />

      <FabButton
        onPress={() => {
          setSelectedNote(undefined);
          router.push('/notes/form');
        }}>
        <Icon as={PlusIcon} className='text-accent-foreground' />
      </FabButton>
    </PageLayout>
  );
};

export default NoteListPage;
