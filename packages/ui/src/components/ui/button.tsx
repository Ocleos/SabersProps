import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Pressable } from 'react-native';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const buttonVariants = cva(
  'group flex flex-row items-center justify-center gap-4 rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        success: 'bg-success web:hover:opacity-90 active:opacity-90',
        info: 'bg-info web:hover:opacity-90 active:opacity-90',
        warning: 'bg-warning web:hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
      },
      size: {
        default: 'h-10 native:h-12 native:px-5 px-4 native:py-3 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 native:h-14 rounded-md px-8',
        icon: 'h-10 w-10',
        fab: 'absolute right-4 bottom-4 z-20 h-14 w-14 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap font-exo2Medium native:text-base text-foreground text-sm web:transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        success: 'text-success-foreground',
        info: 'text-info-foreground',
        warning: 'text-warning-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: 'native:text-lg',
        icon: '',
        fab: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & VariantProps<typeof buttonVariants>;

const Button = forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <TextClassContext.Provider value={buttonTextVariants({ variant, size, className: 'web:pointer-events-none' })}>
        <Pressable
          className={cn(
            props.disabled && 'web:pointer-events-none opacity-50',
            buttonVariants({ variant, size, className }),
          )}
          ref={ref}
          role='button'
          {...props}
        />
      </TextClassContext.Provider>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
