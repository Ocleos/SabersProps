import * as TogglePrimitive from '@rn-primitives/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const toggleVariants = cva(
  'web:group web:inline-flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:hover:bg-muted web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:bg-muted',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 native:h-12 native:px-[12] px-3',
        lg: 'h-11 native:h-14 native:px-6 px-5',
        sm: 'h-9 native:h-10 native:px-[9] px-2.5',
      },
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent web:hover:bg-accent active:bg-accent',
      },
    },
  },
);

const toggleTextVariants = cva('font-exo2Medium native:text-base text-foreground text-sm', {
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    size: {
      default: '',
      lg: '',
      sm: '',
    },
    variant: {
      default: '',
      outline: 'web:group-hover:text-accent-foreground web:group-active:text-accent-foreground',
    },
  },
});

function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.RootProps &
  VariantProps<typeof toggleVariants> &
  VariantProps<typeof toggleVariants> & {
    ref?: React.RefObject<TogglePrimitive.RootRef>;
  }) {
  return (
    <TextClassContext.Provider
      value={cn(
        toggleTextVariants({ size, variant }),
        props.pressed ? 'text-accent-foreground' : 'web:group-hover:text-muted-foreground',
        className,
      )}>
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ size, variant }),
          props.disabled && 'web:pointer-events-none opacity-50',
          props.pressed && 'border-primary',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function ToggleIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
