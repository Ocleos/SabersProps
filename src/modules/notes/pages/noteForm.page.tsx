import { Button, ButtonIcon, ButtonSpinner, ButtonText, VStack, useToast } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { isError, isNil } from 'lodash';
import { Save } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import ToastWrapper from '~src/components/toast/toastWrapper.component';
import { NOTES_URL_ENDPOINT, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import { Note } from '../models/note.model';
import { useNotesStore } from '../store/notes.store';

const NoteFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'notes']);
  const router = useRouter();

  const { setSelectedNote, selectedNote } = useNotesStore();
  const isEdit = !isNil(selectedNote);

  const toast = useToast();

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
        toast.show({
          render: (id) => <ToastWrapper id={id} action='success' description={t('common:FORMS.EDIT_SUCCESS')} />,
        });

        setSelectedNote(undefined);
      } else {
        toast.show({
          render: (id) => <ToastWrapper id={id} action='success' description={t('common:FORMS.ADD_SUCCESS')} />,
        });
      }
      router.back();
    } catch (error) {
      toast.show({
        render: (id) => (
          <ToastWrapper id={id} action='error' description={isError(error) ? error.message : undefined} />
        ),
      });
    }
  };

  return (
    <VStack gap={'$4'}>
      <InputWrapper
        control={control}
        name='title'
        placeholder={t('notes:FORM.LABELS.TITLE')}
        characterCount={MAX_LENGTH}
        isRequired={true}
      />

      <InputWrapper
        control={control}
        name='description'
        placeholder={t('notes:FORM.LABELS.DESCRIPTION')}
        isRequired={true}
        multiline={true}
        numberOfLines={10}
      />

      <Button isDisabled={isMutating} onPress={handleSubmit(onSubmit)}>
        {isMutating ? <ButtonSpinner /> : <ButtonIcon as={Save} />}
        <ButtonText marginHorizontal={'$2'}>{t('common:COMMON.SAVE')}</ButtonText>
      </Button>
    </VStack>
  );
};

export default NoteFormPage;
