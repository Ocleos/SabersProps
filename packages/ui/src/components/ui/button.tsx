import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { Pressable } from 'react-native';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const buttonVariants = cva(
  'group flex flex-row items-center justify-center gap-4 rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 native:h-12 native:px-5 px-4 native:py-3 py-2',
        fab: 'absolute right-4 bottom-4 z-20 h-14 w-14 rounded-full',
        icon: 'h-10 w-10',
        lg: 'h-11 native:h-14 rounded-md px-8',
        sm: 'h-9 rounded-md px-3',
      },
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        info: 'bg-info web:hover:opacity-90 active:opacity-90',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
        outline:
          'border border-primary bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
        success: 'bg-success web:hover:opacity-90 active:opacity-90',
        warning: 'bg-warning web:hover:opacity-90 active:opacity-90',
      },
    },
  },
);

const buttonTextVariants = cva(
  'web:whitespace-nowrap font-exo2Medium native:text-base text-foreground text-sm web:transition-colors',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: '',
        fab: '',
        icon: '',
        lg: 'native:text-lg',
        sm: '',
      },
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        ghost: 'group-active:text-accent-foreground',
        info: 'text-info-foreground',
        link: 'text-primary group-active:underline',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        success: 'text-success-foreground',
        warning: 'text-warning-foreground',
      },
    },
  },
);

type ButtonProps = React.ComponentProps<typeof Pressable> & VariantProps<typeof buttonVariants>;

function Button({ ref, className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ className: 'web:pointer-events-none', size, variant })}>
      <Pressable
        className={cn(
          props.disabled && 'web:pointer-events-none opacity-50',
          buttonVariants({ className, size, variant }),
        )}
        ref={ref}
        role='button'
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
