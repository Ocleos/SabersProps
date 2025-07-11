import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardContent, colorsTheme, DEFAULT_ICON_SIZE, H1, HStack, Text, VStack } from '@sabersprops/ui';
import { router } from 'expo-router';
import { LogInIcon } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import LogoIcon from '~src/assets/icons/logo.icon';
import InputWrapper from '~src/components/form/inputWrapper.component';
import PasswordInputWrapper from '~src/components/form/passwordInputWrapper.component';
import { appRoutes } from '~src/router/routes.utils';
import { applicationVersion } from '~src/utils/platforms.utils';
import { supabase } from '~src/utils/supabase.utils';
import type { Login } from '../models/login.model';

const LoginPage = () => {
  const { t } = useTranslation(['auth']);

  const [isLoading, setIsLoading] = useState(false);

  const validationSchema: Yup.ObjectSchema<Login> = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const { control, handleSubmit } = useForm<Login>({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onLogin = async (values: Login) => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      Toast.show({ text2: error instanceof Error ? error.message : undefined, type: 'error' });
    }

    setIsLoading(false);
  };

  return (
    <View className='h-full items-center justify-around'>
      <HStack className='items-center gap-4'>
        <LogoIcon color={colorsTheme.primary[500]} height={48} width={48} />
        <H1 className='text-primary'>SabersProps</H1>
      </HStack>

      <Card className='w-full max-w-96 pt-4'>
        <CardContent>
          <VStack className='gap-4'>
            <InputWrapper
              control={control}
              formControlProps={{ isRequired: true }}
              name='email'
              placeholder={t('auth:LABELS.EMAIL')}
            />

            <PasswordInputWrapper
              control={control}
              formControlProps={{ isRequired: true }}
              name='password'
              placeholder={t('auth:LABELS.PASSWORD')}
            />

            <Button disabled={isLoading} onPress={handleSubmit(onLogin)}>
              <HStack className='gap-2'>
                <LogInIcon color={colorsTheme.textForeground} size={DEFAULT_ICON_SIZE} />
                <Text>{t('auth:LABELS.SIGN_IN')}</Text>
              </HStack>
            </Button>

            <Button onPress={() => router.push(appRoutes.auth.signUp)} variant={'link'}>
              <Text>{t('auth:LABELS.SIGN_UP')}</Text>
            </Button>
          </VStack>
        </CardContent>
      </Card>

      {applicationVersion && <Text className='text-center'>{`v${applicationVersion}`}</Text>}
    </View>
  );
};

export default LoginPage;
