import { get } from 'lodash';
import { AlertTriangle, CheckCircle, Info, type LucideIcon, Megaphone, XOctagon } from 'lucide-react-native';
import { View } from 'react-native';
import type { ToastConfig } from 'react-native-toast-message';
import { cn } from '~rnr/lib/utils';
import { HStack, VStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { Large } from '~rnr/ui/typography';
import i18n from '~src/i18n.config';
import { colorsTheme } from '~src/theme/nativewind.theme';

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
      ToastIcon = Megaphone;
      title = i18n.t('common:COMMON.ANNOUNCE');
      colorScheme = 'neutral';
      break;
    }
    case 'error': {
      ToastIcon = XOctagon;
      title = i18n.t('common:COMMON.ERROR');
      colorScheme = 'red';
      break;
    }
    case 'info': {
      ToastIcon = Info;
      title = i18n.t('common:COMMON.INFO');
      colorScheme = 'blue';
      break;
    }
    case 'success': {
      ToastIcon = CheckCircle;
      title = i18n.t('common:COMMON.SUCCESS');
      colorScheme = 'green';
      break;
    }
    case 'warning': {
      ToastIcon = AlertTriangle;
      title = i18n.t('common:COMMON.WARNING');
      colorScheme = 'orange';
      break;
    }
  }

  return (
    <View className={cn(['rounded-md border-l-8 bg-popover p-4', `border-${colorScheme}-500`])}>
      <HStack className='gap-4'>
        <View className='items-center justify-center'>
          <ToastIcon color={get(colorsTheme, `${colorScheme}.500`)} />
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
