import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { SaveIcon } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';
import { Button } from '~rnr/ui/button';
import { VStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import InputWrapper from '~src/components/form/inputWrapper.component';
import TextAreaWrapper from '~src/components/form/textAreaWrapper.component';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';
import { NOTES_URL_ENDPOINT, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import type { Note } from '../models/note.model';
import { useNotesStore } from '../stores/notes.store';

const NoteFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'notes']);
  const router = useRouter();

  const { setSelectedNote, selectedNote } = useNotesStore();
  const isEdit = selectedNote != null;

  const { trigger, isMutating } = useSWRMutation(NOTES_URL_ENDPOINT, isEdit ? putData<Note> : postData<Note>);

  const validationSchema: Yup.ObjectSchema<Note> = Yup.object().shape({
    id: Yup.string().optional(),
    title: Yup.string().required().max(MAX_LENGTH),
    description: Yup.string().required(),
  });

  const { control, handleSubmit } = useForm<Note>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: isEdit ? selectedNote : {},
  });

  const onSubmit = async (values: Note) => {
    try {
      await trigger(values);
      if (isEdit) {
        Toast.show({ type: 'success', text2: t('common:FORMS.EDIT_SUCCESS') });
        setSelectedNote(undefined);
      } else {
        Toast.show({ type: 'success', text2: t('common:FORMS.ADD_SUCCESS') });
      }
      router.back();
    } catch (error) {
      Toast.show({ type: 'error', text2: error instanceof Error ? error.message : undefined });
    }
  };

  return (
    <VStack className='gap-4'>
      <InputWrapper
        control={control}
        name='title'
        placeholder={t('notes:FORM.LABELS.TITLE')}
        formControlProps={{ isRequired: true }}
      />

      <TextAreaWrapper
        control={control}
        name='description'
        placeholder={t('notes:FORM.LABELS.DESCRIPTION')}
        formControlProps={{ isRequired: true }}
        inputProps={{ multiline: true, numberOfLines: 10 }}
      />

      <Button disabled={isMutating} onPress={handleSubmit(onSubmit)}>
        <SaveIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
        <Text>{t('common:COMMON.SAVE')}</Text>
      </Button>
    </VStack>
  );
};

export default NoteFormPage;
