import { useQuery } from '@tanstack/react-query';
import { useIsFocused } from 'expo-router';
import { Button } from 'heroui-native/button';
import { ListGroup } from 'heroui-native/list-group';
import { Typography } from 'heroui-native/text';
import { LogOutIcon, MailIcon, UserIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '~src/components/ui/icon.component';
import { VStack } from '~src/components/ui/stack.component';
import { userKeys } from '~src/utils/queryKeys.utils';
import { getUserData, supabase } from '~src/utils/supabase.utils';

const ProfileSection = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const { data: user } = useQuery({
    queryFn: async () => await getUserData(),
    queryKey: userKeys.root(),
    subscribed: isFocused,
  });

  return (
    <VStack className='gap-2'>
      <Typography type='h6'>{t('profile:PROFILE.TITLE')}</Typography>

      <ListGroup>
        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <Icon as={UserIcon} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>{t('profile:PROFILE.DISPLAY_NAME')}</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>{user?.displayName}</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>

        <ListGroup.Item>
          <ListGroup.ItemPrefix>
            <Icon as={MailIcon} />
          </ListGroup.ItemPrefix>
          <ListGroup.ItemContent>
            <ListGroup.ItemTitle>{t('profile:PROFILE.EMAIL')}</ListGroup.ItemTitle>
            <ListGroup.ItemDescription>{user?.email}</ListGroup.ItemDescription>
          </ListGroup.ItemContent>
        </ListGroup.Item>
      </ListGroup>

      <Button onPress={() => supabase.auth.signOut()}>
        <Icon as={LogOutIcon} className='text-accent-foreground' />
        <Button.Label>{t('auth:LABELS.SIGN_OUT')}</Button.Label>
      </Button>
    </VStack>
  );
};

export default ProfileSection;
