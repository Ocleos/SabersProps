import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useIsFocused, useRouter } from 'expo-router';
import { useToast } from 'heroui-native/toast';
import { PlusIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '~src/components/error/error.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import DraggableFlatListWrapper from '~src/components/list/draggableFlatListWrapper.component';
import FabButton from '~src/components/ui/fabButton.component';
import { Icon } from '~src/components/ui/icon.component';
import { foldersKeys } from '~src/utils/queryKeys.utils';
import { getToastErrorConfig } from '~src/utils/toast.utils';
import FolderCard from '../components/folderList/folderCard.component';
import type { FolderWithPropsCount } from '../services/folders.api';
import { getFoldersWithPropsCount, reorderFolders } from '../services/folders.api';
import { useFoldersStore } from '../stores/folders.store';

const FolderListPage: React.FC = () => {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { isError, isLoading, data, refetch } = useQuery({
    queryFn: async () => await getFoldersWithPropsCount(),
    queryKey: foldersKeys.root(),
    subscribed: isFocused,
  });

  const [orderedFolders, setOrderedFolders] = useState<FolderWithPropsCount[]>(data ?? []);

  useEffect(() => {
    setOrderedFolders(data ?? []);
  }, [data]);

  const { mutate: persistOrder } = useMutation({
    mutationFn: (folders: FolderWithPropsCount[]) => reorderFolders(folders),
    onError: () => {
      toast.show(getToastErrorConfig({ description: t('common:FORMS.EDIT_ERROR') }));
      queryClient.invalidateQueries({ queryKey: foldersKeys.root() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.root() });
    },
  });

  const { setSelectedFolder } = useFoldersStore();

  const onDragEnd = ({ data: newData }: { data: FolderWithPropsCount[] }) => {
    setOrderedFolders(newData);
    persistOrder(newData);
  };

  return (
    <PageLayout isScrollable={false} title={t('collection:ROUTING.FOLDERS')}>
      {isError ? (
        <ErrorComponent onRetry={() => refetch()} />
      ) : (
        <DraggableFlatListWrapper
          data={orderedFolders}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onDragEnd={onDragEnd}
          onRefresh={() => refetch()}
          refreshing={isLoading}
          renderItem={({ item, drag, isActive }) => (
            <FolderCard count={item.propsCount} drag={drag} folder={item} isActive={isActive} />
          )}
        />
      )}

      <FabButton
        onPress={() => {
          setSelectedFolder(undefined);
          router.push('/collection/folders/form');
        }}>
        <Icon as={PlusIcon} className='text-accent-foreground' />
      </FabButton>
    </PageLayout>
  );
};

export default FolderListPage;
