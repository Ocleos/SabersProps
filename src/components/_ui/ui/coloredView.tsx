import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { View } from 'react-native';
import { TextClassContext } from '~src/components/_ui/ui/text';

const coloredViewVariants = cva('', {
  variants: {
    variant: {
      default: 'border-primary-500 bg-primary-200',
      blue: 'border-blue-500 bg-blue-200',
      green: 'border-green-500 bg-green-200',
      neutral: 'border-neutral-500 bg-neutral-200',
      orange: 'border-orange-500 bg-orange-200',
      red: 'border-red-500 bg-red-200',
      yellow: 'border-yellow-500 bg-yellow-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const coloredViewTextVariants = cva('', {
  variants: {
    variant: {
      default: 'text-primary-600',
      red: 'text-red-600',
      blue: 'text-blue-600',
      green: 'text-green-600',
      neutral: 'text-neutral-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ColoredViewProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof coloredViewVariants>;

const ColoredView = React.forwardRef<React.ElementRef<typeof View>, ColoredViewProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <TextClassContext.Provider value={coloredViewTextVariants({ variant })}>
        <View className={coloredViewVariants({ variant, className })} ref={ref} {...props} />
      </TextClassContext.Provider>
    );
  },
);
ColoredView.displayName = 'ColoredView';

export { ColoredView, coloredViewTextVariants, coloredViewVariants };
export type { ColoredViewProps };
