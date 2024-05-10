import { Label } from '~ui/label';
import { HStack, VStack } from '~ui/stack';
import { Text } from '~ui/text';
import { AlertOctagon, Info } from '../_ui/Icons';
import { cn } from '../_ui/lib/utils';

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
        <Label nativeID={`${name}-item`} className={cn('pb-1 text-lg', error && 'text-destructive')}>
          {placeholder}
        </Label>

        {props.isRequired && <Text className='text-destructive'>*</Text>}
      </HStack>

      {children}

      {helperText && (
        <HStack className='items-center gap-1 pt-1'>
          <Info className='text-muted-foreground' size={14} />
          <Text className='text-muted-foreground text-sm'>{helperText}</Text>
        </HStack>
      )}

      {error && (
        <HStack className='items-center gap-1 pt-1'>
          <AlertOctagon className='text-destructive' size={14} />
          <Text className='font-exo2Medium text-destructive text-sm'>{error}</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default FormControlWrapper;
