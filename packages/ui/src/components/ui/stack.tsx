import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { cn } from '~ui/lib/utils';

const stackVariants = cva('flex', {
  defaultVariants: {
    variant: 'vertical',
  },
  variants: {
    variant: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
});

type StackProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof stackVariants>;

const Stack = forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <View className={cn(stackVariants({ className, variant }))} ref={ref} {...props} />;
});
Stack.displayName = 'Stack';

const HStack = forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <Stack className={className} ref={ref} variant='horizontal' {...props} />;
});
Stack.displayName = 'HStack';

const VStack = forwardRef<React.ElementRef<typeof View>, StackProps>(({ className, variant, ...props }, ref) => {
  return <Stack className={className} ref={ref} variant='vertical' {...props} />;
});
Stack.displayName = 'VStack';

export { HStack, Stack, VStack, stackVariants };
export type { StackProps };
