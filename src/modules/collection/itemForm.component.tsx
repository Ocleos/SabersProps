import { yupResolver } from '@hookform/resolvers/yup';
import FormControlWrapper from '@src/components/form/formControlWrapper.component';
import InputWrapper from '@src/components/form/inputWrapper.component';
import { ItemCollection } from '@src/models/itemCollection.model';
import { VStack } from 'native-base';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const ItemFormComponent: React.FC = () => {
  const { t } = useTranslation(['common']);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('common:VALIDATION.REQUIRED') ?? ''),
    character: Yup.string(),
    manufacturer: Yup.string().required(t('common:VALIDATION.REQUIRED') ?? ''),
    chassisDesigner: Yup.string(),
    soundboard: Yup.string(),
    apparition: Yup.string(),
    state: Yup.number().required(t('common:VALIDATION.REQUIRED') ?? ''),
    type: Yup.number().required(t('common:VALIDATION.REQUIRED') ?? ''),
  });

  const { control } = useForm<ItemCollection>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  return (
    <VStack space={4}>
      <FormControlWrapper label='Nom' name='name' control={control} isRequired={true}>
        <InputWrapper control={control} name='name' placeholder='Nom' />
      </FormControlWrapper>

      <FormControlWrapper label='Character' name='character' control={control}>
        <InputWrapper control={control} name='character' />
      </FormControlWrapper>
    </VStack>
  );
};

export default ItemFormComponent;
