import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useToast } from 'heroui-native/toast';
import { SaveIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CalendarInputWrapper from '~src/components/form/calendarInputWrapper.component';
import InputWrapper from '~src/components/form/inputWrapper.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { FORMAT_DATE } from '~src/utils/format.utils';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { COMPONENTS_TABLE, postData, putData } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { usePropDetailStore } from '../stores/propDetail.store';
import { type PropComponent, propComponentSchema } from '../types/propComponent.type';

const PropComponentFormPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { id: idProp } = useLocalSearchParams<{ id: string }>();

  const { setSelectedComponent, selectedComponent } = usePropDetailStore();
  const isEdit = selectedComponent != null;

  const title = isEdit ? t('collection:FORM.COMPONENT_EDIT') : t('collection:FORM.COMPONENT_ADD');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PropComponent) =>
      isEdit ? putData<PropComponent>(COMPONENTS_TABLE, data) : postData<PropComponent>(COMPONENTS_TABLE, data),
    onError: () => {
      toast.show(
        getToastErrorConfig({ description: isEdit ? t('common:FORMS.EDIT_ERROR') : t('common:FORMS.ADD_ERROR') }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propsKeys.detail(idProp) });
      queryClient.invalidateQueries({ queryKey: propsKeys.stats() });
      toast.show(
        getToastSuccessConfig({ description: isEdit ? t('common:FORMS.EDIT_SUCCESS') : t('common:FORMS.ADD_SUCCESS') }),
      );
      setSelectedComponent(undefined);
      reset();
      router.back();
    },
  });

  const { control, handleSubmit, setValue, reset } = useForm<PropComponent>({
    defaultValues: isEdit
      ? selectedComponent
      : {
          idProp: idProp,
        },
    mode: 'onChange',
    resolver: yupResolver(propComponentSchema),
  });

  useEffect(() => {
    reset(isEdit && selectedComponent ? selectedComponent : { idProp: idProp });
  }, [idProp, isEdit, reset, selectedComponent]);

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
    <PageLayout isScrollable={true} title={title}>
      <VStack className='gap-4'>
        <InputWrapper
          control={control}
          name='seller'
          placeholder={t('collection:LABELS.SELLER')}
          textFieldProps={{ isRequired: true }}
        />

        <CalendarInputWrapper
          control={control}
          dateFormat={FORMAT_DATE}
          name='date'
          placeholder={t('collection:LABELS.DATE')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper
          control={control}
          name='label'
          placeholder={t('collection:LABELS.LABEL')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper
          control={control}
          inputProps={{ keyboardType: 'numeric' }}
          name='rate'
          placeholder={t('collection:LABELS.RATE')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper
          control={control}
          inputProps={{ keyboardType: 'numeric' }}
          name='price'
          placeholder={t('collection:LABELS.PRICE')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper
          control={control}
          inputProps={{ keyboardType: 'numeric' }}
          name='priceEuros'
          placeholder={`${t('collection:LABELS.PRICE')} (€)`}
          textFieldProps={{ isDisabled: true }}
        />

        <InputWrapper
          control={control}
          inputProps={{ keyboardType: 'numeric' }}
          name='fees'
          placeholder={t('collection:LABELS.FEES')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper
          control={control}
          inputProps={{ keyboardType: 'numeric' }}
          name='feesEuros'
          placeholder={`${t('collection:LABELS.FEES')} (€)`}
          textFieldProps={{ isDisabled: true }}
        />

        <Button isDisabled={isPending} onPress={handleSubmit(onSubmit)}>
          <Icon as={SaveIcon} className='text-accent-foreground' />
          <Button.Label>{t('common:COMMON.SAVE')}</Button.Label>
        </Button>
      </VStack>
    </PageLayout>
  );
};

export default PropComponentFormPage;
