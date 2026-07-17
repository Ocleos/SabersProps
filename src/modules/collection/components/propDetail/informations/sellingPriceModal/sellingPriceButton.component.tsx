import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'heroui-native/button';
import { useToast } from 'heroui-native/toast';
import { PencilIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputWrapper from '~src/components/form/inputWrapper.component';
import ModalWrapper from '~src/components/modal/modalWrapper.component';
import { Icon } from '~src/components/ui/icon.component';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { type PropSellingPrice, propSellingPriceSchema } from '~src/modules/collection/types/propSellingPrice.type';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_SELLING_PRICE_TABLE, upsertData } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';

type SellingPriceButtonProps = {
  prop: PropDetail;
};

const SellingPriceButton: React.FC<SellingPriceButtonProps> = ({ prop }) => {
  const { t } = useTranslation(['collection']);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PropSellingPrice) => upsertData<PropSellingPrice>(PROPS_SELLING_PRICE_TABLE, data),
    onError: () => {
      toast.show(getToastErrorConfig({ description: t('common:FORMS.EDIT_ERROR') }));
    },
    onSuccess: (_data, newSellingPrice) => {
      // The mutation already succeeded, so this value is confirmed — write it in directly instead of
      // waiting for the invalidation below to refetch, so the underlying totals don't flash stale.
      if (prop.id) {
        queryClient.setQueryData<PropDetail | null | undefined>(propsKeys.detail(prop.id), (old) =>
          old?.prices ? { ...old, prices: { ...old.prices, sellingPrice: newSellingPrice.sellingPrice } } : old,
        );
        queryClient.invalidateQueries({ queryKey: propsKeys.detail(prop.id) });
      }
      queryClient.invalidateQueries({ queryKey: propsKeys.statsPrices() });

      toast.show(getToastSuccessConfig({ description: t('common:FORMS.EDIT_SUCCESS') }));
      reset();
      setIsOpen(false);
    },
  });

  const { control, handleSubmit, reset } = useForm<PropSellingPrice>({
    defaultValues: {
      id: prop.id,
      sellingPrice: prop.prices?.sellingPrice,
    },
    mode: 'onChange',
    resolver: yupResolver(propSellingPriceSchema),
  });

  useEffect(() => {
    reset({
      id: prop.id,
      sellingPrice: prop.prices?.sellingPrice,
    });
  }, [prop.id, prop.prices?.sellingPrice, reset]);

  const onSubmit = async (values: PropSellingPrice) => {
    await mutate(values);
  };

  return (
    <>
      <Button isIconOnly={true} onPress={() => setIsOpen(true)} variant='ghost'>
        <Icon as={PencilIcon} className='text-accent' />
      </Button>

      <ModalWrapper
        content={
          <InputWrapper
            control={control}
            inputProps={{ keyboardType: 'numeric' }}
            name='sellingPrice'
            placeholder={t('collection:LABELS.SELLING_PRICE')}
            textFieldProps={{ isRequired: true }}
          />
        }
        hasCancelButton
        isOpen={isOpen}
        mainButton={
          <Button isDisabled={isPending} onPress={handleSubmit(onSubmit)}>
            <Button.Label>{t('common:COMMON.SAVE')}</Button.Label>
          </Button>
        }
        onClose={() => setIsOpen(false)}
        title={t('collection:FORM.EDIT_SELLING_PRICE')}
      />
    </>
  );
};

export default SellingPriceButton;
