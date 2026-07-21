import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useToast } from 'heroui-native/toast';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '~src/components/error/error.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import DraggableFlatListWrapper from '~src/components/list/draggableFlatListWrapper.component';
import { foldersKeys } from '~src/utils/queryKeys.utils';
import { getToastErrorConfig } from '~src/utils/toast.utils';
import AddPropsToFolderSheet from '../components/folderDetail/addPropsToFolderSheet.component';
import FolderPanelPreview from '../components/folderDetail/folderPanelPreview.component';
import FolderPropRow from '../components/folderDetail/folderPropRow.component';
import { getFolderWithProps, reorderFolderProps } from '../services/folders.api';
import type { Prop } from '../types/prop.type';

const FolderDetailPage: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: folder,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => await getFolderWithProps(id),
    queryKey: foldersKeys.detail(id),
  });

  const [orderedProps, setOrderedProps] = useState<Prop[]>(folder?.props ?? []);

  useEffect(() => {
    setOrderedProps(folder?.props ?? []);
  }, [folder?.props]);

  const { mutate: persistOrder } = useMutation({
    mutationFn: (props: Prop[]) => reorderFolderProps(props),
    onError: () => {
      toast.show(getToastErrorConfig({ description: t('common:FORMS.EDIT_ERROR') }));
      queryClient.invalidateQueries({ queryKey: foldersKeys.detail(id) });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.detail(id) });
    },
  });

  const onDragEnd = ({ data: newData }: { data: Prop[] }) => {
    setOrderedProps(newData);
    persistOrder(newData);
  };

  const folderPanelPreview = useMemo(() => <FolderPanelPreview props={orderedProps} />, [orderedProps]);

  return (
    <PageLayout isScrollable={false} title={folder?.name ?? ''}>
      {isError ? (
        <ErrorComponent onRetry={() => refetch()} />
      ) : (
        <DraggableFlatListWrapper
          data={orderedProps}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          ListHeaderComponent={folderPanelPreview}
          onDragEnd={onDragEnd}
          onRefresh={() => refetch()}
          refreshing={isLoading}
          renderItem={({ item, drag, isActive }) => (
            <FolderPropRow drag={drag} folderId={id} isActive={isActive} prop={item} />
          )}
        />
      )}

      <AddPropsToFolderSheet currentPropsCount={folder?.props.length ?? 0} folderId={id} />
    </PageLayout>
  );
};

export default FolderDetailPage;
