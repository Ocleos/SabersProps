import { Alert, CloseIcon, HStack, IAlertProps, IconButton, Text, VStack } from 'native-base';

interface IAlertWrapperProps extends IAlertProps {
  title: string;
  description?: string;
  onClose: Function;
}

const AlertWrapper: React.FC<IAlertWrapperProps> = (props) => {
  const { title, onClose, description } = props;

  return (
    <Alert w="100%" variant={'left-accent'} {...props}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1} color={'darkText'}>
              {title}
            </Text>
          </HStack>
          <IconButton variant="unstyled" icon={<CloseIcon size="3" />} onPress={() => onClose()} />
        </HStack>
        {description && (
          <Text px="6" color={'darkText'}>
            {description}
          </Text>
        )}
      </VStack>
    </Alert>
  );
};

export default AlertWrapper;
