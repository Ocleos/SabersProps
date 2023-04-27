import { MaterialCommunityIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControlWrapper from '@src/components/form/formControlWrapper.component';
import InputWrapper from '@src/components/form/inputWrapper.component';
import SelectWrapper from '@src/components/form/selectWrapper.component';
import { Prop } from '@src/models/prop.model';
import { PropType } from '@src/models/propType.model';
import { State } from '@src/models/state.model';
import { postProp, propsUrlEndpoint } from '@src/services/props.api';
import { showErrorToaster, showSuccessToaster } from '@src/utils/toaster.utils';
import { MAX_LENGTH } from '@src/utils/validator.utils';
import { useRouter } from 'expo-router';
import { Button, Icon, Select, VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';

const PropFormComponent: React.FC = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(propsUrlEndpoint, postProp);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().max(MAX_LENGTH),
    character: Yup.string().max(MAX_LENGTH),
    manufacturer: Yup.string().required().max(MAX_LENGTH),
    chassisDesigner: Yup.string().max(MAX_LENGTH),
    soundboard: Yup.string().max(MAX_LENGTH),
    apparition: Yup.string().max(MAX_LENGTH),
    state: Yup.number().required(),
    type: Yup.number().required(),
  });

  const { control, handleSubmit } = useForm<Prop>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: Prop) => {
    try {
      await trigger(values);
      showSuccessToaster(t('common:FORMS.ADD_SUCCESS') ?? '');
      router.back();
    } catch (error) {
      showErrorToaster(error);
    }
  };

  return (
    <VStack space={4}>
      <FormControlWrapper label={t('collection:FORM.LABELS.NAME')} name='name' control={control} isRequired={true}>
        <InputWrapper control={control} name='name' placeholder={t('collection:FORM.LABELS.NAME') ?? ''} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.TYPE')} name='type' control={control} isRequired={true}>
        <SelectWrapper control={control} name='type' placeholder={t('collection:FORM.LABELS.TYPE') ?? ''}>
          <Select.Item label={t('collection:TYPE.LIGHTSABER')} value={PropType.LIGHTSABER.toString()} />
          <Select.Item label={t('collection:TYPE.PROP')} value={PropType.PROP.toString()} />
          <Select.Item label={t('collection:TYPE.COSTUME')} value={PropType.COSTUME.toString()} />
        </SelectWrapper>
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.STATE')} name='state' control={control} isRequired={true}>
        <SelectWrapper control={control} name='state' placeholder={t('collection:FORM.LABELS.STATE') ?? ''}>
          <Select.Item label={t('collection:STATE.PRODUCTION')} value={State.PRODUCTION.toString()} />
          <Select.Item label={t('collection:STATE.DESIGN')} value={State.DESIGN.toString()} />
          <Select.Item label={t('collection:STATE.MISSING_PIECES')} value={State.MISSING_PIECES.toString()} />
          <Select.Item label={t('collection:STATE.READY')} value={State.READY.toString()} />
          <Select.Item label={t('collection:STATE.IN_PROGRESS')} value={State.IN_PROGRESS.toString()} />
          <Select.Item label={t('collection:STATE.DONE')} value={State.DONE.toString()} />
          <Select.Item label={t('collection:STATE.ON_SALE')} value={State.ON_SALE.toString()} />
          <Select.Item label={t('collection:STATE.SOLD')} value={State.SOLD.toString()} />
        </SelectWrapper>
      </FormControlWrapper>

      <FormControlWrapper
        label={t('collection:FORM.LABELS.MANUFACTURER')}
        name='manufacturer'
        control={control}
        isRequired={true}
      >
        <InputWrapper
          control={control}
          name='manufacturer'
          placeholder={t('collection:FORM.LABELS.MANUFACTURER') ?? ''}
        />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.CHARACTER')} name='character' control={control}>
        <InputWrapper control={control} name='character' placeholder={t('collection:FORM.LABELS.CHARACTER') ?? ''} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.APPARITION')} name='apparition' control={control}>
        <InputWrapper control={control} name='apparition' placeholder={t('collection:FORM.LABELS.APPARITION') ?? ''} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.CHASSIS_DESIGNER')} name='chassisDesigner' control={control}>
        <InputWrapper
          control={control}
          name='chassisDesigner'
          placeholder={t('collection:FORM.LABELS.CHASSIS_DESIGNER') ?? ''}
        />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:FORM.LABELS.SOUNDBOARD')} name='soundboard' control={control}>
        <InputWrapper control={control} name='soundboard' placeholder={t('collection:FORM.LABELS.SOUNDBOARD') ?? ''} />
      </FormControlWrapper>

      <Button
        size={'lg'}
        onPress={handleSubmit(onSubmit)}
        startIcon={<Icon as={MaterialCommunityIcons} name="content-save" size={'md'} />}
        isLoading={isMutating}
        isDisabled={isMutating}
      >
        {t('common:COMMON.SAVE')}
      </Button>
    </VStack>
  );
};

export default PropFormComponent;
