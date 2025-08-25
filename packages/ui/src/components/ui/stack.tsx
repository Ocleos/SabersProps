import { cva, type VariantProps } from 'class-variance-authority';
import { View, type ViewProps } from 'react-native';
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

type StackProps = ViewProps & React.RefAttributes<View> & VariantProps<typeof stackVariants>;

const Stack: React.FC<StackProps> = ({ className, variant, ...props }) => {
  return <View className={cn(stackVariants({ className, variant }))} {...props} />;
};

const HStack: React.FC<StackProps> = ({ className, variant, ...props }) => {
  return <Stack className={className} variant='horizontal' {...props} />;
};

const VStack: React.FC<StackProps> = ({ className, variant, ...props }) => {
  return <Stack className={className} variant='vertical' {...props} />;
};

export { HStack, Stack, VStack, stackVariants };
export type { StackProps };
