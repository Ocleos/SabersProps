import { DEFAULT_ICON_SIZE, HStack, Large, Text, VStack, cn, colorsTheme } from '@sabersprops/ui';
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  type LucideIcon,
  MegaphoneIcon,
  XOctagonIcon,
} from 'lucide-react-native';
import { get } from 'radash';
import { View } from 'react-native';
import type { ToastConfig } from 'react-native-toast-message';
import i18n from '~src/i18n.config';

export const toastConfig: ToastConfig = {
  error: (props) => <ToastWrapper action='error' description={props.text2} />,
  warning: (props) => <ToastWrapper action='warning' description={props.text2} />,
  success: (props) => <ToastWrapper action='success' description={props.text2} />,
  info: (props) => <ToastWrapper action='info' description={props.text2} />,
  attention: (props) => <ToastWrapper action='attention' description={props.text2} />,
};

type ToastWrapperProps = {
  description?: string;
  action: 'error' | 'warning' | 'success' | 'info' | 'attention';
};

const ToastWrapper: React.FC<ToastWrapperProps> = ({ description, action }) => {
  let ToastIcon: LucideIcon;
  let title: string;
  let colorScheme: string;

  switch (action) {
    case 'attention': {
      ToastIcon = MegaphoneIcon;
      title = i18n.t('common:COMMON.ANNOUNCE');
      colorScheme = 'neutral';
      break;
    }
    case 'error': {
      ToastIcon = XOctagonIcon;
      title = i18n.t('common:COMMON.ERROR');
      colorScheme = 'red';
      break;
    }
    case 'info': {
      ToastIcon = InfoIcon;
      title = i18n.t('common:COMMON.INFO');
      colorScheme = 'blue';
      break;
    }
    case 'success': {
      ToastIcon = CheckCircleIcon;
      title = i18n.t('common:COMMON.SUCCESS');
      colorScheme = 'green';
      break;
    }
    case 'warning': {
      ToastIcon = AlertTriangleIcon;
      title = i18n.t('common:COMMON.WARNING');
      colorScheme = 'orange';
      break;
    }
  }

  return (
    <View className={cn(['rounded-md border-l-8 bg-popover p-4', `border-${colorScheme}-500`])}>
      <HStack className='gap-4'>
        <View className='items-center justify-center'>
          <ToastIcon size={DEFAULT_ICON_SIZE} color={get(colorsTheme, `${colorScheme}.500`)} />
        </View>
        <VStack className='gap-1'>
          <Large className='text-popover-foreground'>{title}</Large>
          <Text className='text-popover-foreground'>{description}</Text>
        </VStack>
      </HStack>
    </View>
  );
};

export default ToastWrapper;
