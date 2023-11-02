import { Button, ButtonIcon, ButtonSpinner, ButtonText, VStack, useToast } from '@gluestack-ui/themed';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { isError, isNaN as isNaNumber, isNil } from 'lodash';
import { Save } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import ToastWrapper from '~src/components/toast/toastWrapper.component';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import { PropComponent } from '../models/propComponent.model';
import { usePropDetailStore } from '../stores/propDetail.store';

const PropComponentForm = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();
  const toast = useToast();

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

    setValue('priceEuros', isNaNumber(priceEuros) ? 0 : priceEuros);
    setValue('feesEuros', isNaNumber(feesEuros) ? 0 : feesEuros);
  }, [setValue, rateWatch, priceWatch, feesWatch]);

  const onSubmit = async (values: PropComponent) => {
    try {
      await trigger(values);
      if (isEdit) {
        toast.show({
          render: (id) => <ToastWrapper id={id} action='success' description={t('common:FORMS.EDIT_SUCCESS')} />,
        });
        setSelectedComponent(undefined);
      } else {
        toast.show({
          render: (id) => <ToastWrapper id={id} action='success' description={t('common:FORMS.ADD_SUCCESS')} />,
        });
      }
      mutate([PROPS_URL_ENDPOINT, idProp]);
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
        name='seller'
        placeholder={t('collection:LABELS.SELLER')}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='date'
        placeholder={t('collection:LABELS.DATE')}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='label'
        placeholder={t('collection:LABELS.LABEL')}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='rate'
        placeholder={t('collection:LABELS.RATE')}
        inputProps={{ keyboardType: 'numeric' }}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='price'
        placeholder={t('collection:LABELS.PRICE')}
        inputProps={{ keyboardType: 'numeric' }}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='priceEuros'
        placeholder={`${t('collection:LABELS.PRICE')} (€)`}
        inputProps={{ keyboardType: 'numeric' }}
        formControlProps={{ isDisabled: true }}
      />

      <InputWrapper
        control={control}
        name='fees'
        placeholder={t('collection:LABELS.FEES')}
        inputProps={{ keyboardType: 'numeric' }}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='feesEuros'
        placeholder={`${t('collection:LABELS.FEES')} (€)`}
        inputProps={{ keyboardType: 'numeric' }}
        formControlProps={{ isDisabled: true }}
      />

      <Button isDisabled={isMutating} onPress={handleSubmit(onSubmit)}>
        {isMutating ? <ButtonSpinner /> : <ButtonIcon as={Save} />}
        <ButtonText marginHorizontal={'$2'}>{t('common:COMMON.SAVE')}</ButtonText>
      </Button>
    </VStack>
  );
};

export default PropComponentForm;
