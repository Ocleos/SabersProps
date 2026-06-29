import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { Select } from 'heroui-native/select';
import { useToast } from 'heroui-native/toast';
import { SaveIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputWrapper from '~src/components/form/inputWrapper.component';
import SelectWrapper from '~src/components/form/selectWrapper.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE, postData, putData } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { useCollectionStore } from '../stores/collection.store';
import { type Prop, propSchema } from '../types/prop.type';
import { PropState, propStates } from '../types/propState.type';
import { PropType, propTypes } from '../types/propType.type';

const EMPTY_PROP_VALUES: Prop = {
  character: '',
  chassisDesigner: '',
  manufacturer: '',
  name: '',
  soundboard: '',
  state: PropState.PRODUCTION,
  type: PropType.LIGHTSABER,
};

const PropFormPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { setSelectedProp, selectedProp } = useCollectionStore();
  const isEdit = selectedProp != null;

  const title = isEdit ? t('collection:FORM.PROP_EDIT') : t('collection:FORM.PROP_ADD');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Prop) => (isEdit ? putData<Prop>(PROPS_TABLE, data) : postData<Prop>(PROPS_TABLE, data)),

    onError: () => {
      toast.show(
        getToastErrorConfig({ description: isEdit ? t('common:FORMS.EDIT_ERROR') : t('common:FORMS.ADD_ERROR') }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propsKeys.root() });
      toast.show(
        getToastSuccessConfig({ description: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS') }),
      );
      setSelectedProp(undefined);
      reset();
      router.back();
    },
  });

  const { control, handleSubmit, reset } = useForm<Prop>({
    defaultValues: EMPTY_PROP_VALUES,
    mode: 'onChange',
    resolver: yupResolver(propSchema),
  });

  useEffect(() => {
    reset(isEdit && selectedProp ? selectedProp : EMPTY_PROP_VALUES);
  }, [isEdit, reset, selectedProp]);

  const onSubmit = async (values: Prop) => {
    await mutate(values);
  };

  return (
    <PageLayout isScrollable={true} title={title}>
      <VStack className='gap-4'>
        <InputWrapper
          control={control}
          name='name'
          placeholder={t('collection:LABELS.NAME')}
          textFieldProps={{ isRequired: true }}
        />

        <SelectWrapper
          control={control}
          controlFieldProps={{ isRequired: true }}
          initialSelectedValue={
            isEdit ? { label: propTypes[selectedProp.type].label, value: selectedProp.type.toString() } : undefined
          }
          name='type'
          placeholder={t('collection:LABELS.TYPE')}>
          <Select.Item label={t('collection:TYPE.LIGHTSABER')} value={PropType.LIGHTSABER.toString()} />
          <Select.Item label={t('collection:TYPE.PROP')} value={PropType.PROP.toString()} />
          <Select.Item label={t('collection:TYPE.COSTUME')} value={PropType.COSTUME.toString()} />
        </SelectWrapper>

        <SelectWrapper
          control={control}
          controlFieldProps={{ isRequired: true }}
          initialSelectedValue={
            isEdit ? { label: propStates[selectedProp.state].label, value: selectedProp.state.toString() } : undefined
          }
          name='state'
          placeholder={t('collection:LABELS.STATE')}>
          <Select.Item label={t('collection:STATE.PRODUCTION')} value={PropState.PRODUCTION.toString()} />
          <Select.Item label={t('collection:STATE.DESIGN')} value={PropState.DESIGN.toString()} />
          <Select.Item label={t('collection:STATE.MISSING_PIECES')} value={PropState.MISSING_PIECES.toString()} />
          <Select.Item label={t('collection:STATE.READY')} value={PropState.READY.toString()} />
          <Select.Item label={t('collection:STATE.IN_PROGRESS')} value={PropState.IN_PROGRESS.toString()} />
          <Select.Item label={t('collection:STATE.DONE')} value={PropState.DONE.toString()} />
          <Select.Item label={t('collection:STATE.ON_SALE')} value={PropState.ON_SALE.toString()} />
          <Select.Item label={t('collection:STATE.SOLD')} value={PropState.SOLD.toString()} />
        </SelectWrapper>

        <InputWrapper
          control={control}
          name='manufacturer'
          placeholder={t('collection:LABELS.MANUFACTURER')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper control={control} name='character' placeholder={t('collection:LABELS.CHARACTER')} />

        <InputWrapper control={control} name='chassisDesigner' placeholder={t('collection:LABELS.CHASSIS_DESIGNER')} />

        <InputWrapper control={control} name='soundboard' placeholder={t('collection:LABELS.SOUNDBOARD')} />

        <Button isDisabled={isPending} onPress={handleSubmit(onSubmit)}>
          <Icon as={SaveIcon} className='text-accent-foreground' />
          <Button.Label>{t('common:COMMON.SAVE')}</Button.Label>
        </Button>
      </VStack>
    </PageLayout>
  );
};

export default PropFormPage;
