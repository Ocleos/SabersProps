import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlWrapper from '@src/components/form/formControlWrapper.component';
import InputWrapper from '@src/components/form/inputWrapper.component';
import SelectWrapper from '@src/components/form/selectWrapper.component';
import { Prop } from '@src/models/prop.model';
import { PropState } from '@src/models/propState.model';
import { PropType } from '@src/models/propType.model';
import { PROPS_URL_ENDPOINT, postData, putData } from '@src/utils/supabase.utils';
import { showErrorToaster, showSuccessToaster } from '@src/utils/toaster.utils';
import { MAX_LENGTH } from '@src/utils/validator.utils';
import { useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Button, Icon, Select, VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';
import { useCollectionStore } from '../store/collection.store';

const PropFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();

  const { setSelectedProp, selectedProp } = useCollectionStore();
  const isEdit = !isNil(selectedProp);

  const { trigger, isMutating } = useSWRMutation(PROPS_URL_ENDPOINT, isEdit ? putData<Prop> : postData<Prop>);

  const validationSchema: Yup.ObjectSchema<Prop> = Yup.object().shape({
    id: Yup.string().optional(),
    name: Yup.string().required().max(MAX_LENGTH),
    state: Yup.number().required(),
    type: Yup.number().required(),
    manufacturer: Yup.string().required().max(MAX_LENGTH),
    character: Yup.string().nullable().max(MAX_LENGTH),
    chassisDesigner: Yup.string().nullable().max(MAX_LENGTH),
    soundboard: Yup.string().nullable().max(MAX_LENGTH),
    apparition: Yup.string().nullable().max(MAX_LENGTH),
  });

  const { control, handleSubmit } = useForm<Prop>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: isEdit ? selectedProp : {},
  });

  const onSubmit = async (values: Prop) => {
    try {
      await trigger(values);
      if (isEdit) {
        showSuccessToaster(t('common:FORMS.EDIT_SUCCESS'));
        setSelectedProp(undefined);
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
      <FormControlWrapper label={t('collection:LABELS.NAME')} name='name' control={control} isRequired={true}>
        <InputWrapper control={control} name='name' placeholder={t('collection:LABELS.NAME')} />
      </FormControlWrapper>

      <FormControlWrapper
        label={t('collection:LABELS.TYPE')}
        name='type'
        control={control}
        isRequired={true}
        isReadOnly={true}
      >
        <SelectWrapper control={control} name='type' placeholder={t('collection:LABELS.TYPE')}>
          <Select.Item label={t('collection:TYPE.LIGHTSABER')} value={PropType.LIGHTSABER.toString()} />
          <Select.Item label={t('collection:TYPE.PROP')} value={PropType.PROP.toString()} />
          <Select.Item label={t('collection:TYPE.COSTUME')} value={PropType.COSTUME.toString()} />
        </SelectWrapper>
      </FormControlWrapper>

      <FormControlWrapper
        label={t('collection:LABELS.STATE')}
        name='state'
        control={control}
        isRequired={true}
        isReadOnly={true}
      >
        <SelectWrapper control={control} name='state' placeholder={t('collection:LABELS.STATE')}>
          <Select.Item label={t('collection:STATE.PRODUCTION')} value={PropState.PRODUCTION.toString()} />
          <Select.Item label={t('collection:STATE.DESIGN')} value={PropState.DESIGN.toString()} />
          <Select.Item label={t('collection:STATE.MISSING_PIECES')} value={PropState.MISSING_PIECES.toString()} />
          <Select.Item label={t('collection:STATE.READY')} value={PropState.READY.toString()} />
          <Select.Item label={t('collection:STATE.IN_PROGRESS')} value={PropState.IN_PROGRESS.toString()} />
          <Select.Item label={t('collection:STATE.DONE')} value={PropState.DONE.toString()} />
          <Select.Item label={t('collection:STATE.ON_SALE')} value={PropState.ON_SALE.toString()} />
          <Select.Item label={t('collection:STATE.SOLD')} value={PropState.SOLD.toString()} />
        </SelectWrapper>
      </FormControlWrapper>

      <FormControlWrapper
        label={t('collection:LABELS.MANUFACTURER')}
        name='manufacturer'
        control={control}
        isRequired={true}
      >
        <InputWrapper control={control} name='manufacturer' placeholder={t('collection:LABELS.MANUFACTURER')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.CHARACTER')} name='character' control={control}>
        <InputWrapper control={control} name='character' placeholder={t('collection:LABELS.CHARACTER')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.APPARITION')} name='apparition' control={control}>
        <InputWrapper control={control} name='apparition' placeholder={t('collection:LABELS.APPARITION')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.CHASSIS_DESIGNER')} name='chassisDesigner' control={control}>
        <InputWrapper control={control} name='chassisDesigner' placeholder={t('collection:LABELS.CHASSIS_DESIGNER')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.SOUNDBOARD')} name='soundboard' control={control}>
        <InputWrapper control={control} name='soundboard' placeholder={t('collection:LABELS.SOUNDBOARD')} />
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

export default PropFormPage;