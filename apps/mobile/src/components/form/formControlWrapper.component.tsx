import { cn, HStack, Icon, Label, Text, VStack } from '@sabersprops/ui';
import { AlertOctagonIcon, InfoIcon } from 'lucide-react-native';

export type FormControlProps = {
  isRequired?: boolean;
  isDisabled?: boolean;
};

type FormControlWrapperProps = {
  name: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
} & FormControlProps;

const FormControlWrapper: React.FC<FormControlWrapperProps> = (props) => {
  const { name, placeholder, error, helperText, children } = props;

  return (
    <VStack>
      <HStack className='gap-1'>
        <Label className={cn('pb-1 text-lg', error && 'text-destructive')} nativeID={`${name}-item`}>
          {placeholder}
        </Label>

        {props.isRequired && <Text className='text-destructive'>*</Text>}
      </HStack>

      {children}

      {helperText && (
        <HStack className='items-center gap-1 pt-1'>
          <Icon as={InfoIcon} className='text-muted-foreground' size={14} />
          <Text className='text-muted-foreground text-sm'>{helperText}</Text>
        </HStack>
      )}

      {error && (
        <HStack className='items-center gap-1 pt-1'>
          <Icon as={AlertOctagonIcon} className='text-destructive' size={14} />
          <Text className='font-exo2Medium text-destructive text-sm'>{error}</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default FormControlWrapper;
