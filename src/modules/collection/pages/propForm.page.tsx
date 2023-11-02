import { Button, ButtonIcon, ButtonSpinner, ButtonText, SelectItem, VStack, useToast } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { isError, isNil } from 'lodash';
import { Save } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useSWRMutation from 'swr/mutation';
import * as Yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import SelectWrapper from '~src/components/form/selectWrapper.component';
import ToastWrapper from '~src/components/toast/toastWrapper.component';
import { Prop } from '~src/models/prop.model';
import { PropState, propStates } from '~src/models/propState.model';
import { PropType, propTypes } from '~src/models/propType.model';
import { PROPS_URL_ENDPOINT, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import { useCollectionStore } from '../stores/collection.store';

const PropFormPage: React.FC = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();
  const toast = useToast();

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
        toast.show({
          render: (id) => <ToastWrapper id={id} action='success' description={t('common:FORMS.EDIT_SUCCESS')} />,
        });
        setSelectedProp(undefined);
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
    <VStack gap={'$4'} flex={1}>
      <InputWrapper
        control={control}
        name='name'
        placeholder={t('collection:LABELS.NAME')}
        formControlProps={{ isRequired: true }}
      />

      <SelectWrapper
        control={control}
        name='type'
        placeholder={t('collection:LABELS.TYPE')}
        initialSelectedLabel={isEdit ? propTypes[selectedProp.type].label : undefined}
        formControlProps={{ isRequired: true }}
      >
        <SelectItem label={t('collection:TYPE.LIGHTSABER')} value={PropType.LIGHTSABER.toString()} />
        <SelectItem label={t('collection:TYPE.PROP')} value={PropType.PROP.toString()} />
        <SelectItem label={t('collection:TYPE.COSTUME')} value={PropType.COSTUME.toString()} />
      </SelectWrapper>

      <SelectWrapper
        control={control}
        name='state'
        placeholder={t('collection:LABELS.STATE')}
        initialSelectedLabel={isEdit ? propStates[selectedProp.state].label : undefined}
        formControlProps={{ isRequired: true }}
      >
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
        name='manufacturer'
        placeholder={t('collection:LABELS.MANUFACTURER')}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper control={control} name='character' placeholder={t('collection:LABELS.CHARACTER')} />

      <InputWrapper control={control} name='chassisDesigner' placeholder={t('collection:LABELS.CHASSIS_DESIGNER')} />

      <InputWrapper control={control} name='soundboard' placeholder={t('collection:LABELS.SOUNDBOARD')} />

      <Button isDisabled={isMutating} onPress={handleSubmit(onSubmit)}>
        {isMutating ? <ButtonSpinner /> : <ButtonIcon as={Save} />}
        <ButtonText marginHorizontal={'$2'}>{t('common:COMMON.SAVE')}</ButtonText>
      </Button>
    </VStack>
  );
};

export default PropFormPage;
