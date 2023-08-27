import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlWrapper from '@src/components/form/formControlWrapper.component';
import InputWrapper from '@src/components/form/inputWrapper.component';
import TextAreaWrapper from '@src/components/form/textAreaWrapper.component';
import { NOTES_URL_ENDPOINT, postData, putData } from '@src/utils/supabase.utils';
import { showErrorToaster, showSuccessToaster } from '@src/utils/toaster.utils';
import { MAX_LENGTH } from '@src/utils/validator.utils';
import { useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Button, Icon, VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';
import { Note } from '../models/note.model';
import { useNotesStore } from '../store/notes.store';

const NoteFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'notes']);
  const router = useRouter();

  const { setSelectedNote, selectedNote } = useNotesStore();
  const isEdit = !isNil(selectedNote);

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
        showSuccessToaster(t('common:FORMS.EDIT_SUCCESS'));
        setSelectedNote(undefined);
      } else {
        showSuccessToaster(t('common:FORMS.ADD_SUCCESS'));
      }
      router.back();
    } catch (error) {
      showErrorToaster(error);
    }
  };

  return (
    <VStack space={4}>
      <FormControlWrapper label={t('notes:FORM.LABELS.TITLE')} name='title' control={control} isRequired={true}>
        <InputWrapper control={control} name='title' placeholder={t('notes:FORM.LABELS.TITLE')} />
      </FormControlWrapper>

      <FormControlWrapper
        label={t('notes:FORM.LABELS.DESCRIPTION')}
        name='description'
        control={control}
        isRequired={true}
      >
        <TextAreaWrapper
          control={control}
          name='description'
          placeholder={t('notes:FORM.LABELS.DESCRIPTION')}
          totalLines={10}
          h={64}
        />
      </FormControlWrapper>

      <Button
        size={'lg'}
        onPress={handleSubmit(onSubmit)}
        startIcon={<Icon as={MaterialCommunityIcons} name='content-save-outline' size={'md'} />}
        isLoading={isMutating}
        isDisabled={isMutating}
      >
        {t('common:COMMON.SAVE')}
      </Button>
    </VStack>
  );
};

export default NoteFormPage;
