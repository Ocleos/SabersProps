import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useToast } from 'heroui-native/toast';
import { SaveIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputWrapper from '~src/components/form/inputWrapper.component';
import TextAreaWrapper from '~src/components/form/textAreaWrapper.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { notesKeys } from '~src/utils/queryKeys.utils';
import { NOTES_TABLE, postData, putData } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { useNotesStore } from '../stores/notes.store';
import { type Note, noteSchema } from '../types/note.type';

const EMPTY_NOTE_VALUES: Note = {
  description: '',
  title: '',
};

const NoteFormPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { setSelectedNote, selectedNote } = useNotesStore();
  const isEdit = selectedNote != null;

  const title = isEdit ? t('notes:FORM.EDIT_TITLE') : t('notes:FORM.ADD_TITLE');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Note) => (isEdit ? putData<Note>(NOTES_TABLE, data) : postData<Note>(NOTES_TABLE, data)),
    onError: () => {
      toast.show(
        getToastErrorConfig({ description: isEdit ? t('common:FORMS.EDIT_ERROR') : t('common:FORMS.ADD_ERROR') }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.root() });
      toast.show(
        getToastSuccessConfig({ description: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS') }),
      );
      setSelectedNote(undefined);
      reset();
      router.back();
    },
  });

  const { control, handleSubmit, reset } = useForm<Note>({
    defaultValues: EMPTY_NOTE_VALUES,
    mode: 'onChange',
    resolver: yupResolver(noteSchema),
  });

  useEffect(() => {
    reset(isEdit && selectedNote ? selectedNote : EMPTY_NOTE_VALUES);
  }, [isEdit, reset, selectedNote]);

  const onSubmit = async (values: Note) => {
    await mutate(values);
  };

  return (
    <PageLayout isScrollable={true} title={title}>
      <VStack className='gap-4'>
        <InputWrapper
          control={control}
          name='title'
          placeholder={t('notes:FORM.LABELS.TITLE')}
          textFieldProps={{ isRequired: true }}
        />

        <TextAreaWrapper
          control={control}
          name='description'
          placeholder={t('notes:FORM.LABELS.DESCRIPTION')}
          textAreaProps={{ numberOfLines: 10 }}
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

export default NoteFormPage;
