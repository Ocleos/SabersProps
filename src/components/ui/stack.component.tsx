import { cn } from 'heroui-native/utils';
import { View, type ViewProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const stackVariants = tv({
  base: 'flex',
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

export type { StackProps };
export { HStack, Stack, stackVariants, VStack };
