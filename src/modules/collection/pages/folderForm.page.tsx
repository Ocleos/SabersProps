import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useToast } from 'heroui-native/toast';
import { SaveIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputWrapper from '~src/components/form/inputWrapper.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { foldersKeys } from '~src/utils/queryKeys.utils';
import { FOLDERS_TABLE, getData, postData, putData } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { useFoldersStore } from '../stores/folders.store';
import { type Folder, folderSchema } from '../types/folder.type';

const EMPTY_FOLDER_VALUES: Folder = {
  name: '',
  order: 0,
};

const FolderFormPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { setSelectedFolder, selectedFolder } = useFoldersStore();
  const isEdit = selectedFolder != null;

  const title = isEdit ? t('collection:FOLDERS.FORM.EDIT_TITLE') : t('collection:FOLDERS.FORM.ADD_TITLE');

  const { data: folderCount } = useQuery({
    enabled: !isEdit,
    queryFn: async () => await getData<Folder>(FOLDERS_TABLE),
    queryKey: foldersKeys.root(),
    select: (folders) => folders.length,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Folder) =>
      isEdit ? putData<Folder>(FOLDERS_TABLE, data) : postData<Folder>(FOLDERS_TABLE, data),
    onError: () => {
      toast.show(
        getToastErrorConfig({ description: isEdit ? t('common:FORMS.EDIT_ERROR') : t('common:FORMS.ADD_ERROR') }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: foldersKeys.root() });
      toast.show(
        getToastSuccessConfig({ description: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS') }),
      );
      setSelectedFolder(undefined);
      reset();
      router.back();
    },
  });

  const { control, handleSubmit, reset } = useForm<Folder>({
    defaultValues: EMPTY_FOLDER_VALUES,
    mode: 'onChange',
    resolver: yupResolver(folderSchema),
  });

  useEffect(() => {
    reset(isEdit && selectedFolder ? selectedFolder : EMPTY_FOLDER_VALUES);
  }, [isEdit, reset, selectedFolder]);

  const onSubmit = async (values: Folder) => {
    await mutate(isEdit ? values : { ...values, order: folderCount ?? 0 });
  };

  return (
    <PageLayout isScrollable={true} title={title}>
      <VStack className='gap-4'>
        <InputWrapper
          control={control}
          name='name'
          placeholder={t('collection:FOLDERS.FORM.LABELS.NAME')}
          textFieldProps={{ isRequired: true }}
        />

        <Button isDisabled={isPending} onPress={handleSubmit(onSubmit)}>
          <Icon as={SaveIcon} className='text-accent-foreground' />
          <Button.Label>{t('common:COMMON.SAVE')}</Button.Label>
        </Button>
      </VStack>
    </PageLayout>
  );
};

export default FolderFormPage;
