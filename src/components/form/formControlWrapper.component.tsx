import { AlertOctagonIcon, InfoIcon } from 'lucide-react-native';
import { cn } from '~rnr/lib/utils';
import { Label } from '~rnr/ui/label';
import { HStack, VStack } from '~rnr/ui/stack';
import { Text } from '~rnr/ui/text';
import { colorsTheme } from '~src/theme/nativewind.theme';
import { useColorScheme } from '~src/theme/useColorTheme.theme';

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

  const { colorScheme } = useColorScheme();

  return (
    <VStack>
      <HStack className='gap-1'>
        <Label nativeID={`${name}-item`} className={cn('pb-1 text-lg', error && 'text-destructive')}>
          {placeholder}
        </Label>

        {props.isRequired && <Text className='text-destructive'>*</Text>}
      </HStack>

      {children}

      {helperText && (
        <HStack className='items-center gap-1 pt-1'>
          <InfoIcon color={colorsTheme.mutedForeground[colorScheme]} size={14} />
          <Text className='text-muted-foreground text-sm'>{helperText}</Text>
        </HStack>
      )}

      {error && (
        <HStack className='items-center gap-1 pt-1'>
          <AlertOctagonIcon color={colorsTheme.red[500]} size={14} />
          <Text className='font-exo2Medium text-destructive text-sm'>{error}</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default FormControlWrapper;
