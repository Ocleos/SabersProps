import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Platform } from 'react-native';
import { cn } from '~ui/lib/utils';

function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.RootProps & React.RefAttributes<RadioGroupPrimitive.RootRef>) {
  return <RadioGroupPrimitive.Root className={cn('gap-2', className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: RadioGroupPrimitive.ItemProps & React.RefAttributes<RadioGroupPrimitive.ItemRef>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'aspect-square size-4 shrink-0 items-center justify-center rounded-full border border-input shadow-black/5 shadow-sm dark:bg-input/30',
        'border-primary', // Override
        Platform.select({
          web: 'outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        }),
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className='size-2 rounded-full bg-primary' />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
