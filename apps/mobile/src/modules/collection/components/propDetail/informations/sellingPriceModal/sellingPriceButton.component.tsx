import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DEFAULT_ICON_SIZE, Text, colorsTheme } from '@sabersprops/ui';
import { PencilIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import * as yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import ModalWrapper from '~src/components/modal/modalWrapper.component';
import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import type { PropSellingPrice } from '~src/modules/collection/models/propSellingPrice.model';
import { PROPS_SELLING_PRICE_URL_ENDPOINT, PROPS_URL_ENDPOINT, upsertData } from '~src/utils/supabase.utils';

interface ISellingPriceButtonProps {
  prop: PropDetail;
}

const SellingPriceButton: React.FC<ISellingPriceButtonProps> = ({ prop }) => {
  const { t } = useTranslation(['collection']);

  const [isOpen, setIsOpen] = useState(false);

  const { trigger, isMutating } = useSWRMutation(PROPS_SELLING_PRICE_URL_ENDPOINT, upsertData<PropSellingPrice>);
  const { mutate } = useSWRConfig();

  const validationSchema: yup.ObjectSchema<PropSellingPrice> = yup.object().shape({
    id: yup.string().optional(),
    sellingPrice: yup.number().required().min(0),
  });

  const { control, handleSubmit } = useForm<PropSellingPrice>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      id: prop.id,
      sellingPrice: prop.prices?.sellingPrice,
    },
  });

  const onSubmit = async (values: PropSellingPrice) => {
    try {
      await trigger(values);
      setIsOpen(false);
      Toast.show({ type: 'success', text2: t('common:FORMS.EDIT_SUCCESS') });
      mutate([PROPS_URL_ENDPOINT, prop.id]);
    } catch (error) {
      Toast.show({ type: 'error', text2: error instanceof Error ? error.message : undefined });
    }
  };

  return (
    <>
      <Button size='icon' variant='ghost' onPress={() => setIsOpen(true)}>
        <PencilIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.primary[500]} />
      </Button>

      <ModalWrapper
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t('collection:FORM.EDIT_SELLING_PRICE')}
        content={
          <InputWrapper
            control={control}
            name='sellingPrice'
            placeholder={t('collection:LABELS.SELLING_PRICE')}
            inputProps={{ keyboardType: 'numeric' }}
            formControlProps={{ isRequired: true }}
          />
        }
        mainButton={
          <Button disabled={isMutating} onPress={handleSubmit(onSubmit)}>
            <Text>{t('common:COMMON.SAVE')}</Text>
          </Button>
        }
        hasCancelButton
      />
    </>
  );
};

export default SellingPriceButton;
