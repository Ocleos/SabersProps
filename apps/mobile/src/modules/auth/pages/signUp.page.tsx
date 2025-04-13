import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DEFAULT_ICON_SIZE, HStack, Text, VStack, colorsTheme } from '@sabersprops/ui';
import { router } from 'expo-router';
import { SaveIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import InputWrapper from '~src/components/form/inputWrapper.component';
import PasswordInputWrapper from '~src/components/form/passwordInputWrapper.component';
import { appRoutes } from '~src/router/routes.utils';
import { supabase } from '~src/utils/supabase.utils';
import { MAX_LENGTH } from '~src/utils/validator.utils';
import type { NewAccount } from '../models/newAccount.model';

const SignUpPage = () => {
  const { t } = useTranslation(['auth']);

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema: Yup.ObjectSchema<NewAccount> = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().password(),
    displayName: Yup.string().required().max(MAX_LENGTH),
  });

  const { control, handleSubmit } = useForm<NewAccount>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const onSignUp = async (values: NewAccount) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          displayName: values.displayName,
        },
      },
    });

    if (error) {
      Toast.show({ type: 'error', text2: error instanceof Error ? error.message : undefined });
    }

    if (data) {
      Toast.show({ type: 'success', text2: t('auth:MESSAGES.CREATE_SUCCESS') });
      router.replace(appRoutes.auth.login);
    }

    setIsLoading(false);
  };

  return (
    <VStack className='gap-4'>
      <InputWrapper
        control={control}
        name='email'
        placeholder={t('auth:LABELS.EMAIL')}
        formControlProps={{ isRequired: true }}
      />

      <InputWrapper
        control={control}
        name='displayName'
        placeholder={t('auth:LABELS.DISPLAY_NAME')}
        formControlProps={{ isRequired: true }}
      />

      <PasswordInputWrapper
        control={control}
        name='password'
        placeholder={t('auth:LABELS.PASSWORD')}
        formControlProps={{ isRequired: true }}
      />

      <Button disabled={isLoading} onPress={handleSubmit(onSignUp)}>
        <HStack className='gap-2'>
          <SaveIcon size={DEFAULT_ICON_SIZE} color={colorsTheme.textForeground} />
          <Text>{t('common:COMMON.SAVE')}</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default SignUpPage;
