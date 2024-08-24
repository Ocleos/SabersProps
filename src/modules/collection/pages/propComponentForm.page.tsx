import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SaveIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';
import { Button } from '~rnr/ui/button';
import { VStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import InputWrapper from '~src/components/form/inputWrapper.component';
import type { PropComponent } from '~src/modules/collection/models/propComponent.model';
import { usePropDetailStore } from '~src/modules/collection/stores/propDetail.store';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { DEFAULT_ICON_SIZE } from '~src/utils/icons.utils';
import { COMPONENTS_URL_ENDPOINT, PROPS_URL_ENDPOINT, postData, putData } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';

const PropComponentForm = () => {
  const { t } = useTranslation(['common', 'collection']);
  const router = useRouter();

  const { setSelectedComponent, selectedComponent } = usePropDetailStore();
  const isEdit = selectedComponent != null;
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

    setValue('priceEuros', Number.isNaN(priceEuros) ? 0 : priceEuros);
    setValue('feesEuros', Number.isNaN(feesEuros) ? 0 : feesEuros);
  }, [setValue, rateWatch, priceWatch, feesWatch]);

  const onSubmit = async (values: PropComponent) => {
    try {
      await trigger(values);
      if (isEdit) {
        Toast.show({ type: 'success', text2: t('common:FORMS.EDIT_SUCCESS') });
        setSelectedComponent(undefined);
      } else {
        Toast.show({ type: 'success', text2: t('common:FORMS.ADD_SUCCESS') });
      }
      mutate([PROPS_URL_ENDPOINT, idProp]);
      router.back();
    } catch (error) {
      Toast.show({ type: 'error', text2: error instanceof Error ? error.message : undefined });
    }
  };

  return (
    <VStack className='gap-4'>
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

      <Button disabled={isMutating} onPress={handleSubmit(onSubmit)}>
        <SaveIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
        <Text>{t('common:COMMON.SAVE')}</Text>
      </Button>
    </VStack>
  );
};

export default PropComponentForm;
