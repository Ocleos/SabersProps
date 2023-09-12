import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { isNil } from 'lodash';
import { Save } from 'lucide-react-native';
import { Button, Icon, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';
import FormControlWrapper from '~src/components/form/formControlWrapper.component';
import InputWrapper from '~src/components/form/inputWrapper.component';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT, postData, putData } from '~src/utils/supabase.utils';
import { showErrorToaster, showSuccessToaster } from '~src/utils/toaster.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import { PropComponent } from '../models/propComponent.model';
import { usePropDetailStore } from '../store/propDetail.store';

const PropComponentForm = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();

  const { setSelectedComponent, selectedComponent } = usePropDetailStore();
  const isEdit = !isNil(selectedComponent);
  const { id: idProp } = useLocalSearchParams<{ id: string }>();

  const { trigger, isMutating } = useSWRMutation(
    COMPONENTS_URL_ENDPOINT,
    isEdit ? putData<PropComponent> : postData<PropComponent>,
  );
  const { mutate } = useSWRConfig();

  const validationSchema: yup.ObjectSchema<PropComponent> = yup.object().shape({
    id: yup.string().optional(),
    idProp: yup.string().defined(),
    seller: yup.string().required().max(MAX_LENGTH),
    date: yup.string().required(),
    label: yup.string().required().max(MAX_LENGTH),
    rate: yup.number().required().min(0),
    price: yup.number().required().min(0),
    fees: yup.number().required().min(0),
    priceEuros: yup.number().required(),
    feesEuros: yup.number().required(),
  });

  const { control, handleSubmit, setValue } = useForm<PropComponent>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: isEdit
      ? selectedComponent
      : {
          idProp: idProp,
        },
  });

  const rateWatch = useWatch({ control, name: 'rate' });
  const priceWatch = useWatch({ control, name: 'price' });
  const feesWatch = useWatch({ control, name: 'fees' });

  useEffect(() => {
    const priceEuros = rateWatch * priceWatch;
    const feesEuros = rateWatch * feesWatch;

    setValue('priceEuros', isNaN(priceEuros) ? 0 : priceEuros);
    setValue('feesEuros', isNaN(feesEuros) ? 0 : feesEuros);
  }, [rateWatch, priceWatch, feesWatch]);

  const onSubmit = async (values: PropComponent) => {
    try {
      await trigger(values);
      if (isEdit) {
        showSuccessToaster(t('common:FORMS.EDIT_SUCCESS'));
        setSelectedComponent(undefined);
      } else {
        showSuccessToaster(t('common:FORMS.ADD_SUCCESS'));
      }
      mutate([PROPS_URL_ENDPOINT, idProp]);
      router.back();
    } catch (error) {
      showErrorToaster(error);
    }
  };

  return (
    <VStack space={4}>
      <FormControlWrapper label={t('collection:LABELS.SELLER')} name='seller' control={control} isRequired={true}>
        <InputWrapper control={control} name='seller' placeholder={t('collection:LABELS.SELLER')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.DATE')} name='date' control={control} isRequired={true}>
        <InputWrapper control={control} name='date' placeholder={t('collection:LABELS.DATE')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.LABEL')} name='label' control={control} isRequired={true}>
        <InputWrapper control={control} name='label' placeholder={t('collection:LABELS.LABEL')} />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.RATE')} name='rate' control={control} isRequired={true}>
        <InputWrapper control={control} name='rate' placeholder={t('collection:LABELS.RATE')} keyboardType='numeric' />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.PRICE')} name='price' control={control} isRequired={true}>
        <InputWrapper
          control={control}
          name='price'
          placeholder={t('collection:LABELS.PRICE')}
          keyboardType='numeric'
        />
      </FormControlWrapper>

      <FormControlWrapper
        label={`${t('collection:LABELS.PRICE')} (€)`}
        name='priceEuros'
        control={control}
        isRequired={true}
        isDisabled={true}
        isReadOnly={true}
      >
        <InputWrapper
          control={control}
          name='priceEuros'
          placeholder={`${t('collection:LABELS.PRICE')} (€)`}
          keyboardType='numeric'
        />
      </FormControlWrapper>

      <FormControlWrapper label={t('collection:LABELS.FEES')} name='fees' control={control} isRequired={true}>
        <InputWrapper control={control} name='fees' placeholder={t('collection:LABELS.FEES')} keyboardType='numeric' />
      </FormControlWrapper>

      <FormControlWrapper
        label={`${t('collection:LABELS.FEES')} (€)`}
        name='feesEuros'
        control={control}
        isRequired={true}
        isDisabled={true}
        isReadOnly={true}
      >
        <InputWrapper
          control={control}
          name='feesEuros'
          placeholder={`${t('collection:LABELS.FEES')} (€)`}
          keyboardType='numeric'
        />
      </FormControlWrapper>

      <Button
        size={'lg'}
        onPress={handleSubmit(onSubmit)}
        startIcon={<Icon as={Save} size={'md'} />}
        isLoading={isMutating}
        isDisabled={isMutating}
      >
        {t('common:COMMON.SAVE')}
      </Button>
    </VStack>
  );
};

export default PropComponentForm;
