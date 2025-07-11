import { yupResolver } from '@hookform/resolvers/yup';
import { Button, colorsTheme, DEFAULT_ICON_SIZE, Text } from '@sabersprops/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PencilIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import ModalWrapper from '~src/components/modal/modalWrapper.component';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import type { PropSellingPrice } from '~src/modules/collection/models/propSellingPrice.model';
import { propsKeys } from '~src/utils/queryKeys.utils';
import { PROPS_SELLING_PRICE_TABLE, upsertData } from '~src/utils/supabase.utils';

interface ISellingPriceButtonProps {
  prop: PropDetail;
}

const SellingPriceButton: React.FC<ISellingPriceButtonProps> = ({ prop }) => {
  const { t } = useTranslation(['collection']);
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PropSellingPrice) => upsertData<PropSellingPrice>(PROPS_SELLING_PRICE_TABLE, data),
    onSuccess: () => {
      if (prop.id) {
        queryClient.invalidateQueries({ queryKey: propsKeys.detail(prop.id) });
      }
      queryClient.invalidateQueries({ queryKey: propsKeys.statsPrices() });
      Toast.show({ text2: t('common:FORMS.EDIT_SUCCESS'), type: 'success' });
      setIsOpen(false);
    },
  });

  const validationSchema: yup.ObjectSchema<PropSellingPrice> = yup.object().shape({
    id: yup.string().optional(),
    sellingPrice: yup.number().required().min(0),
  });

  const { control, handleSubmit } = useForm<PropSellingPrice>({
    defaultValues: {
      id: prop.id,
      sellingPrice: prop.prices?.sellingPrice,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: PropSellingPrice) => {
    await mutate(values);
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)} size='icon' variant='ghost'>
        <PencilIcon color={colorsTheme.primary[500]} size={DEFAULT_ICON_SIZE} />
      </Button>

      <ModalWrapper
        content={
          <InputWrapper
            control={control}
            formControlProps={{ isRequired: true }}
            inputProps={{ keyboardType: 'numeric' }}
            name='sellingPrice'
            placeholder={t('collection:LABELS.SELLING_PRICE')}
          />
        }
        hasCancelButton
        isOpen={isOpen}
        mainButton={
          <Button disabled={isPending} onPress={handleSubmit(onSubmit)}>
            <Text>{t('common:COMMON.SAVE')}</Text>
          </Button>
        }
        onClose={() => setIsOpen(false)}
        title={t('collection:FORM.EDIT_SELLING_PRICE')}
      />
    </>
  );
};

export default SellingPriceButton;
