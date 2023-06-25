import { MaterialCommunityIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlWrapper from '@src/components/form/formControlWrapper.component';
import InputWrapper from '@src/components/form/inputWrapper.component';
import SelectWrapper from '@src/components/form/selectWrapper.component';
import { Prop } from '@src/models/prop.model';
import { PropState } from '@src/models/propState.model';
import { PropType } from '@src/models/propType.model';
import { postProp, propsUrlEndpoint, putProp } from '@src/services/props.api';
import { useCollectionStore } from '@src/store/collection.store';
import { showErrorToaster, showSuccessToaster } from '@src/utils/toaster.utils';
import { MAX_LENGTH } from '@src/utils/validator.utils';
import { useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Button, Icon, Select, VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';

const PropFormComponent: React.FC = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();

  const { setSelectedProp, selectedProp } = useCollectionStore();
  const isEdit = !isNil(selectedProp);

  const { trigger, isMutating } = useSWRMutation(propsUrlEndpoint, isEdit ? putProp : postProp);

  const validationSchema = Yup.object().shape({
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

  const { control, handleSubmit } = useForm({
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
      <FormControlWrapper label={t('collection:FORM.LABELS.NAME')} name='name' control={control} isRequired={true}>
        <InputWrapper control={control} name='name' placeholder={t('collection:FORM.LABELS.NAME')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.TYPE')} name='type' control={control} isRequired={true}>
        <SelectWrapper control={control} name='type' placeholder={t('collection:FORM.LABELS.TYPE')}>
          <Select.Item label={t('collection:TYPE.LIGHTSABER')} value={PropType.LIGHTSABER.toString()} />
          <Select.Item label={t('collection:TYPE.PROP')} value={PropType.PROP.toString()} />
          <Select.Item label={t('collection:TYPE.COSTUME')} value={PropType.COSTUME.toString()} />
        </SelectWrapper>
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.STATE')} name='state' control={control} isRequired={true}>
        <SelectWrapper control={control} name='state' placeholder={t('collection:FORM.LABELS.STATE')}>
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
        label={t('collection:FORM.LABELS.MANUFACTURER')}
        name='manufacturer'
        control={control}
        isRequired={true}
      >
        <InputWrapper control={control} name='manufacturer' placeholder={t('collection:FORM.LABELS.MANUFACTURER')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.CHARACTER')} name='character' control={control}>
        <InputWrapper control={control} name='character' placeholder={t('collection:FORM.LABELS.CHARACTER')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.APPARITION')} name='apparition' control={control}>
        <InputWrapper control={control} name='apparition' placeholder={t('collection:FORM.LABELS.APPARITION')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.CHASSIS_DESIGNER')} name='chassisDesigner' control={control}>
        <InputWrapper
          control={control}
          name='chassisDesigner'
          placeholder={t('collection:FORM.LABELS.CHASSIS_DESIGNER')}
        />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.SOUNDBOARD')} name='soundboard' control={control}>
        <InputWrapper control={control} name='soundboard' placeholder={t('collection:FORM.LABELS.SOUNDBOARD')} />
      </FormControlWrapper>

      <Button
        size={'lg'}
        onPress={handleSubmit(onSubmit)}
        startIcon={<Icon as={MaterialCommunityIcons} name='content-save' size={'md'} />}
        isLoading={isMutating}
        isDisabled={isMutating}
      >
        {t('common:COMMON.SAVE')}
      </Button>
    </VStack>
  );
};

export default PropFormComponent;
