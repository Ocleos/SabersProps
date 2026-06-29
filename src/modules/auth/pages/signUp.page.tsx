import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { Button } from 'heroui-native/button';
import { useToast } from 'heroui-native/toast';
import { SaveIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputWrapper from '~src/components/form/inputWrapper.component';
import PasswordInputWrapper from '~src/components/form/passwordInputWrapper.component';
import PageLayout from '~src/components/layout/pageLayout.component';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { supabase } from '~src/utils/supabase.utils';
import { getToastErrorConfig, getToastSuccessConfig } from '~src/utils/toast.utils';
import { type NewAccount, newAccountSchema } from '../types/newAccount.type';

const SignUpPage = () => {
  const { t } = useTranslation(['auth']);
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<NewAccount>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(newAccountSchema),
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
      toast.show(getToastErrorConfig({ description: t('auth:MESSAGES.SIGNUP_ERROR') }));
    }

    if (data) {
      toast.show(getToastSuccessConfig({ description: t('auth:MESSAGES.SIGNUP_SUCCESS') }));
      router.replace('/(auth)/login');
    }

    setIsLoading(false);
  };

  return (
    <PageLayout isScrollable={true} title={t('auth:ROUTING.NEW_ACCOUNT')}>
      <VStack className='gap-4'>
        <InputWrapper
          control={control}
          name='email'
          placeholder={t('auth:LABELS.EMAIL')}
          textFieldProps={{ isRequired: true }}
        />

        <InputWrapper
          control={control}
          name='displayName'
          placeholder={t('auth:LABELS.DISPLAY_NAME')}
          textFieldProps={{ isRequired: true }}
        />

        <PasswordInputWrapper
          control={control}
          name='password'
          placeholder={t('auth:LABELS.PASSWORD')}
          textFieldProps={{ isRequired: true }}
        />

        <Button isDisabled={isLoading} onPress={handleSubmit(onSignUp)}>
          <Icon as={SaveIcon} className='text-accent-foreground' />
          <Button.Label>{t('common:COMMON.SAVE')}</Button.Label>
        </Button>
      </VStack>
    </PageLayout>
  );
};

export default SignUpPage;
