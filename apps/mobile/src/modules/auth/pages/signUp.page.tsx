import { yupResolver } from '@hookform/resolvers/yup';
import { Button, HStack, Icon, Text, VStack } from '@sabersprops/ui';
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
    displayName: Yup.string().required().max(MAX_LENGTH),
    email: Yup.string().required().email(),
    password: Yup.string().required().password(),
  });

  const { control, handleSubmit } = useForm<NewAccount>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSignUp = async (values: NewAccount) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      options: {
        data: {
          displayName: values.displayName,
        },
      },
      password: values.password,
    });

    if (error) {
      Toast.show({ text2: error instanceof Error ? error.message : undefined, type: 'error' });
    }

    if (data) {
      Toast.show({ text2: t('auth:MESSAGES.CREATE_SUCCESS'), type: 'success' });
      router.replace(appRoutes.auth.login);
    }

    setIsLoading(false);
  };

  return (
    <VStack className='gap-4'>
      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='email'
        placeholder={t('auth:LABELS.EMAIL')}
      />

      <InputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='displayName'
        placeholder={t('auth:LABELS.DISPLAY_NAME')}
      />

      <PasswordInputWrapper
        control={control}
        formControlProps={{ isRequired: true }}
        name='password'
        placeholder={t('auth:LABELS.PASSWORD')}
      />

      <Button disabled={isLoading} onPress={handleSubmit(onSignUp)}>
        <HStack className='gap-2'>
          <Icon as={SaveIcon} className='text-primary-foreground' />
          <Text>{t('common:COMMON.SAVE')}</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

export default SignUpPage;
