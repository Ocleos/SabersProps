import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { cn } from '~ui/lib/utils';

const stackVariants = cva('flex', {
  variants: {
    variant: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    variant: 'vertical',
  },
});

type StackProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof stackVariants>;

const Stack = forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <View className={cn(stackVariants({ variant, className }))} ref={ref} {...props} />;
});
Stack.displayName = 'Stack';

const HStack = forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <Stack variant='horizontal' className={className} ref={ref} {...props} />;
});
Stack.displayName = 'HStack';

const VStack = forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <Stack variant='vertical' className={className} ref={ref} {...props} />;
});
Stack.displayName = 'VStack';

export { HStack, Stack, VStack, stackVariants };
export type { StackProps };
