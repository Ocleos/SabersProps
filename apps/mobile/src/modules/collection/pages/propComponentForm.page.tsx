import { yupResolver } from '@hookform/resolvers/yup';
import { Button, HStack, Icon, Text, VStack } from '@sabersprops/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SaveIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import CalendarInputWrapper from '~src/components/form/calendarInputWrapper.component';
import InputWrapper from '~src/components/form/inputWrapper.component';
import type { PropComponent } from '~src/modules/collection/models/propComponent.model';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { FORMAT_DATE } from '~src/utils/format.utils';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { COMPONENTS_TABLE, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';

const PropComponentForm = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setSelectedComponent, selectedComponent } = usePropDetailStore();
  const isEdit = selectedComponent != null;
  const { id: idProp } = useLocalSearchParams<{ id: string }>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PropComponent) =>
      isEdit ? putData<PropComponent>(COMPONENTS_TABLE, data) : postData<PropComponent>(COMPONENTS_TABLE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propsKeys.detail(idProp) });
      queryClient.invalidateQueries({ queryKey: propsKeys.stats() });
      Toast.show({ text2: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS'), type: 'success' });
      setSelectedComponent(undefined);
      router.back();
    },
  });

  const validationSchema: yup.ObjectSchema<PropComponent> = yup.object().shape({
    date: yup.string().required(),
    fees: yup.number().required().min(0),
    feesEuros: yup.number().required(),
    id: yup.string().optional(),
    idProp: yup.string().defined(),
    label: yup.string().required().max(MAX_LENGTH),
    price: yup.number().required().min(0),
    priceEuros: yup.number().required(),
    rate: yup.number().required().min(0),
    seller: yup.string().required().max(MAX_LENGTH),
  });

  const { control, handleSubmit, setValue } = useForm<PropComponent>({
    defaultValues: isEdit
      ? selectedComponent
      : {
          idProp: idProp,
        },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const rateWatch = useWatch({ control, name: 'rate' });
  const priceWatch = useWatch({ control, name: 'price' });
  const feesWatch = useWatch({ control, name: 'fees' });

  useEffect(() => {
    const priceEuros = rateWatch * priceWatch;
    const feesEuros = rateWatch * feesWatch;

    setValue('priceEuros', Number.isNaN(priceEuros) ? 0 : priceEuros);
    setValue('feesEuros', Number.isNaN(feesEuros) ? 0 : feesEuros);
  }, [setValue, rateWatch, priceWatch, feesWatch]);

  const onSubmit = async (values: PropComponent) => {
    await mutate(values);
  };

  return (
    <VStack className='gap-4'>
      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='seller'
        placeholder={t('collection:LABELS.SELLER')}
      />

      <CalendarInputWrapper
        control={control}
        dateFormat={FORMAT_DATE}
        formControlProps={{ isRequired: true }}
        name='date'
        placeholder={t('collection:LABELS.DATE')}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='label'
        placeholder={t('collection:LABELS.LABEL')}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        inputProps={{ keyboardType: 'numeric' }}
        name='rate'
        placeholder={t('collection:LABELS.RATE')}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        inputProps={{ keyboardType: 'numeric' }}
        name='price'
        placeholder={t('collection:LABELS.PRICE')}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isDisabled: true }}
        inputProps={{ keyboardType: 'numeric' }}
        name='priceEuros'
        placeholder={`${t('collection:LABELS.PRICE')} (€)`}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        inputProps={{ keyboardType: 'numeric' }}
        name='fees'
        placeholder={t('collection:LABELS.FEES')}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isDisabled: true }}
        inputProps={{ keyboardType: 'numeric' }}
        name='feesEuros'
        placeholder={`${t('collection:LABELS.FEES')} (€)`}
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

export default PropComponentForm;
