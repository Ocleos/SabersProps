import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { View } from 'react-native';
import { cn } from '~ui/lib/utils';

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.RootProps & {
  ref?: React.RefObject<RadioGroupPrimitive.RootRef>;
}) {
  return <RadioGroupPrimitive.Root className={cn('web:grid gap-2', className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: RadioGroupPrimitive.ItemProps & {
  ref?: React.RefObject<RadioGroupPrimitive.ItemRef>;
}) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square h-4 native:h-5 native:w-5 w-4 items-center justify-center rounded-full border border-primary text-primary web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        props.disabled && 'web:cursor-not-allowed opacity-50',
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <View className='aspect-square h-[9px] native:h-[10] native:w-[10] w-[9px] rounded-full bg-primary' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
