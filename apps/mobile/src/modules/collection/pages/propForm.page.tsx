import { yupResolver } from '@hookform/resolvers/yup';
import { Button, colorsTheme, DEFAULT_ICON_SIZE, HStack, SelectItem, Text, VStack } from '@sabersprops/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { SaveIcon } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import SelectWrapper from '~src/components/form/selectWrapper.component';
import type { Prop } from '~src/models/prop.model';
import { PropState, propStates } from '~src/models/propState.model';
import { PropType, propTypes } from '~src/models/propType.model';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_TABLE, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';

const PropFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setSelectedProp, selectedProp } = useCollectionStore();
  const isEdit = selectedProp != null;

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Prop) => (isEdit ? putData<Prop>(PROPS_TABLE, data) : postData<Prop>(PROPS_TABLE, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propsKeys.root() });
      Toast.show({ text2: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS'), type: 'success' });
      setSelectedProp(undefined);
      router.back();
    },
  });

  const validationSchema: Yup.ObjectSchema<Prop> = Yup.object().shape({
    character: Yup.string().nullable().max(MAX_LENGTH),
    chassisDesigner: Yup.string().nullable().max(MAX_LENGTH),
    id: Yup.string().optional(),
    manufacturer: Yup.string().required().max(MAX_LENGTH),
    name: Yup.string().required().max(MAX_LENGTH),
    soundboard: Yup.string().nullable().max(MAX_LENGTH),
    state: Yup.number().required(),
    type: Yup.number().required(),
  });

  const { control, handleSubmit } = useForm<Prop>({
    defaultValues: isEdit ? selectedProp : {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: Prop) => {
    await mutate(values);
  };

  return (
    <VStack className='gap-4'>
      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='name'
        placeholder={t('collection:LABELS.NAME')}
      />

      <SelectWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        initialSelectedValue={
          isEdit ? { label: propTypes[selectedProp.type].label, value: selectedProp.type.toString() } : undefined
        }
        name='type'
        placeholder={t('collection:LABELS.TYPE')}>
        <SelectItem label={t('collection:TYPE.LIGHTSABER')} value={PropType.LIGHTSABER.toString()} />
        <SelectItem label={t('collection:TYPE.PROP')} value={PropType.PROP.toString()} />
        <SelectItem label={t('collection:TYPE.COSTUME')} value={PropType.COSTUME.toString()} />
      </SelectWrapper>

      <SelectWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        initialSelectedValue={
          isEdit ? { label: propStates[selectedProp.state].label, value: selectedProp.state.toString() } : undefined
        }
        name='state'
        placeholder={t('collection:LABELS.STATE')}>
        <SelectItem label={t('collection:STATE.PRODUCTION')} value={PropState.PRODUCTION.toString()} />
        <SelectItem label={t('collection:STATE.DESIGN')} value={PropState.DESIGN.toString()} />
        <SelectItem label={t('collection:STATE.MISSING_PIECES')} value={PropState.MISSING_PIECES.toString()} />
        <SelectItem label={t('collection:STATE.READY')} value={PropState.READY.toString()} />
        <SelectItem label={t('collection:STATE.IN_PROGRESS')} value={PropState.IN_PROGRESS.toString()} />
        <SelectItem label={t('collection:STATE.DONE')} value={PropState.DONE.toString()} />
        <SelectItem label={t('collection:STATE.ON_SALE')} value={PropState.ON_SALE.toString()} />
        <SelectItem label={t('collection:STATE.SOLD')} value={PropState.SOLD.toString()} />
      </SelectWrapper>

      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='manufacturer'
        placeholder={t('collection:LABELS.MANUFACTURER')}
      />

      <InputWrapper control={control} name='character' placeholder={t('collection:LABELS.CHARACTER')} />

      <InputWrapper control={control} name='chassisDesigner' placeholder={t('collection:LABELS.CHASSIS_DESIGNER')} />

      <InputWrapper control={control} name='soundboard' placeholder={t('collection:LABELS.SOUNDBOARD')} />

      <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
        <HStack className='gap-2'>
          <SaveIcon color={colorsTheme.textForeground} size={DEFAULT_ICON_SIZE} />
          <Text>{t('common:COMMON.SAVE')}</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default PropFormPage;
