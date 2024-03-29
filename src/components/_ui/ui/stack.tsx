import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~src/components/_ui/lib/utils';

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

const Stack = React.forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <View className={cn(stackVariants({ variant, className }))} ref={ref} {...props} />;
});
Stack.displayName = 'Stack';

const HStack = React.forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <Stack variant='horizontal' className={className} ref={ref} {...props} />;
});
Stack.displayName = 'HStack';

const VStack = React.forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <Stack variant='vertical' className={className} ref={ref} {...props} />;
});
Stack.displayName = 'VStack';

export { HStack, Stack, VStack, stackVariants };
export type { StackProps };
