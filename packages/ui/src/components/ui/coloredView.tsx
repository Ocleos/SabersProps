import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';
import { TextClassContext } from '~ui/components/ui/text';

const coloredViewVariants = cva('', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      blue: 'border-blue-500 bg-blue-200 text-blue-500',
      default: 'border-primary-500 bg-primary-200 text-primary-500',
      green: 'border-green-500 bg-green-200 text-green-500',
      neutral: 'border-neutral-500 bg-neutral-200 text-neutral-500',
      orange: 'border-orange-500 bg-orange-200 text-orange-500',
      red: 'border-red-500 bg-red-200 text-red-500',
      yellow: 'border-yellow-500 bg-yellow-200 text-yellow-500',
    },
  },
});

const coloredViewTextVariants = cva('', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      blue: 'text-blue-600',
      default: 'text-primary-600',
      green: 'text-green-600',
      neutral: 'text-neutral-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
    },
  },
});

type ColoredViewProps = React.ComponentPropsWithRef<typeof View> & VariantProps<typeof coloredViewVariants>;

const ColoredView: React.FC<ColoredViewProps> = ({ className, variant, ref, ...props }) => {
  return (
    <TextClassContext.Provider value={coloredViewTextVariants({ variant })}>
      <View className={coloredViewVariants({ className, variant })} ref={ref} {...props} />
    </TextClassContext.Provider>
  );
};

export { ColoredView, coloredViewTextVariants, coloredViewVariants };
export type { ColoredViewProps };
