import { Center, Icon, Toast, ToastDescription, ToastTitle, VStack } from '@gluestack-ui/themed';
import { AlertTriangle, CheckCircle, Info, type LucideIcon, Megaphone, XOctagon } from 'lucide-react-native';
import i18n from '~src/i18n.config';

type ToastWrapperProps = {
  id: string;
  description?: string;
  action: 'error' | 'warning' | 'success' | 'info' | 'attention';
};

const ToastWrapper: React.FC<ToastWrapperProps> = ({ id, description, action }) => {
  let icon: LucideIcon;
  let title: string;
  const colorIcon = action === 'attention' ? '$secondary500' : `$${action}500`;

  switch (action) {
    case 'attention': {
      icon = Megaphone;
      title = i18n.t('common:COMMON.ANNOUNCE');
      break;
    }
    case 'error': {
      icon = XOctagon;
      title = i18n.t('common:COMMON.ERROR');
      break;
    }
    case 'info': {
      icon = Info;
      title = i18n.t('common:COMMON.INFO');
      break;
    }
    case 'success': {
      icon = CheckCircle;
      title = i18n.t('common:COMMON.SUCCESS');
      break;
    }
    case 'warning': {
      icon = AlertTriangle;
      title = i18n.t('common:COMMON.WARNING');
      break;
    }
  }

  return (
    <Toast nativeID={`toast+${id}`} action={action} variant='accent'>
      <Center>
        <Icon as={icon} size='xl' color={colorIcon} />
      </Center>
      <VStack space='xs' ml={'$4'}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </VStack>
    </Toast>
  );
};

export default ToastWrapper;
