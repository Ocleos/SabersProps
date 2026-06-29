import type { ToastShowOptions } from 'heroui-native/toast';
import { CheckIcon, OctagonAlertIcon, TriangleAlertIcon } from 'lucide-react-native';
import { Icon } from '../components/ui/icon.component';

export const getToastSuccessConfig = (options: ToastShowOptions): ToastShowOptions => {
  return {
    actionLabel: 'Fermer',
    icon: <Icon as={CheckIcon} className='text-success' />,
    label: 'Succès',
    onActionPress: ({ hide }) => hide(),
    placement: 'bottom',
    variant: 'success',
    ...options,
  } as ToastShowOptions;
};

export const getToastErrorConfig = (options: ToastShowOptions): ToastShowOptions => {
  return {
    actionLabel: 'Fermer',
    icon: <Icon as={OctagonAlertIcon} className='text-danger' />,
    label: 'Erreur',
    onActionPress: ({ hide }) => hide(),
    placement: 'bottom',
    variant: 'danger',
    ...options,
  } as ToastShowOptions;
};

export const getToastWarningConfig = (options: ToastShowOptions): ToastShowOptions => {
  return {
    actionLabel: 'Fermer',
    icon: <Icon as={TriangleAlertIcon} className='text-warning' />,
    label: 'Attention',
    onActionPress: ({ hide }) => hide(),
    placement: 'bottom',
    variant: 'warning',
    ...options,
  } as ToastShowOptions;
};
