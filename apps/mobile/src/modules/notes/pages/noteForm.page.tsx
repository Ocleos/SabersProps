import { yupResolver } from '@hookform/resolvers/yup';
import { Button, HStack, Icon, Text, VStack } from '@sabersprops/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { SaveIcon } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import TextAreaWrapper from '~src/components/form/textAreaWrapper.component';
import type { Note } from '~src/modules/notes/models/note.model';
import { useNotesStore } from '~src/modules/notes/stores/notes.store';
import { notesKeys } from '~src/utils/queryKeys.utils';
import { NOTES_TABLE, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';

const NoteFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'notes']);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setSelectedNote, selectedNote } = useNotesStore();
  const isEdit = selectedNote != null;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Note) => (isEdit ? putData<Note>(NOTES_TABLE, data) : postData<Note>(NOTES_TABLE, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKeys.root() });
      Toast.show({ text2: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS'), type: 'success' });
      setSelectedNote(undefined);
      router.back();
    },
  });

  const validationSchema: Yup.ObjectSchema<Note> = Yup.object().shape({
    description: Yup.string().required(),
    id: Yup.string().optional(),
    title: Yup.string().required().max(MAX_LENGTH),
  });

  const { control, handleSubmit } = useForm<Note>({
    defaultValues: isEdit ? selectedNote : {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: Note) => {
    await mutate(values);
  };

  return (
    <VStack className='gap-4'>
      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='title'
        placeholder={t('notes:FORM.LABELS.TITLE')}
      />

      <TextAreaWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        inputProps={{ multiline: true, numberOfLines: 10 }}
        name='description'
        placeholder={t('notes:FORM.LABELS.DESCRIPTION')}
      />

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
        <HStack className='gap-2'>
          <Icon as={SaveIcon} className='text-primary-foreground' />
          <Text>{t('common:COMMON.SAVE')}</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default NoteFormPage;
