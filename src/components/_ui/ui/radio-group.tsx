import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~rnr/lib/utils';
import * as RadioGroupPrimitive from '~rnr/primitives/radio-group';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('gap-2 web:grid', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary native:h-5 native:w-5 web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:ring-offset-background',
        props.disabled && 'opacity-50 web:cursor-not-allowed',
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <View className='aspect-square h-[9px] w-[9px] rounded-full bg-primary native:h-[10] native:w-[10]' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };