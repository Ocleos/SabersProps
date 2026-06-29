import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, useRouter } from 'expo-router';
import { Button } from 'heroui-native/button';
import { Card } from 'heroui-native/card';
import { useThemeColor } from 'heroui-native/hooks';
import { LinkButton } from 'heroui-native/link-button';
import { Typography } from 'heroui-native/text';
import { useToast } from 'heroui-native/toast';
import { LogInIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LogoIcon from '~src/assets/icons/logo.icon';
import InputWrapper from '~src/components/form/inputWrapper.component';
import PasswordInputWrapper from '~src/components/form/passwordInputWrapper.component';
import { Icon } from '~src/components/ui/icon.component';
import { HStack, VStack } from '~src/components/ui/stack.component';
import { applicationVersion } from '~src/utils/platforms.utils';
import { supabase } from '~src/utils/supabase.utils';
import { getToastErrorConfig } from '~src/utils/toast.utils';
import { type Login, loginSchema } from '../types/login.type';

const LoginPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [accentColor] = useThemeColor(['accent']);
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<Login>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });

  const onLogin = async (values: Login) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.show(getToastErrorConfig({ description: t('auth:MESSAGES.LOGIN_ERROR') }));
    }

    setIsLoading(false);
  };

  return (
    <View className='flex-1 p-4'>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='h-full items-center justify-around'>
        <HStack className='items-center gap-4'>
          <LogoIcon color={accentColor} height={48} width={48} />
          <Typography className='text-accent' type='h1'>
            SabersProps
          </Typography>
        </HStack>

        <Card className='w-[90%] max-w-96 pt-4'>
          <Card.Body>
            <VStack className='gap-4'>
              <InputWrapper
                control={control}
                name='email'
                placeholder={t('auth:LABELS.EMAIL')}
                textFieldProps={{ isRequired: true }}
              />

              <PasswordInputWrapper
                control={control}
                name='password'
                placeholder={t('auth:LABELS.PASSWORD')}
                textFieldProps={{ isRequired: true }}
              />

              <Button isDisabled={isLoading} onPress={handleSubmit(onLogin)}>
                <Icon as={LogInIcon} className='text-accent-foreground' />
                <Button.Label>{t('auth:LABELS.SIGN_IN')}</Button.Label>
              </Button>

              <LinkButton onPress={() => router.navigate('/(auth)/signup')}>
                <LinkButton.Label>{t('auth:LABELS.SIGN_UP')}</LinkButton.Label>
              </LinkButton>
            </VStack>
          </Card.Body>
        </Card>

        {applicationVersion && <Typography className='text-center'>{`v${applicationVersion}`}</Typography>}
      </View>
    </View>
  );
};

export default LoginPage;
