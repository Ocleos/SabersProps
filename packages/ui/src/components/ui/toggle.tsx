import * as TogglePrimitive from '@rn-primitives/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform } from 'react-native';
import { Icon } from '~ui/components/ui/icon';
import { TextClassContext } from '~ui/components/ui/text';
import { cn } from '~ui/lib/utils';

const toggleVariants = cva(
  cn(
    'group flex flex-row items-center justify-center gap-2 rounded-md active:bg-muted',
    Platform.select({
      web: 'inline-flex cursor-default whitespace-nowrap outline-none transition-[color,box-shadow] hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none',
    }),
  ),
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 min-w-10 px-2.5 sm:h-9 sm:min-w-9 sm:px-2',
        lg: 'h-11 min-w-11 px-3 sm:h-10 sm:min-w-10 sm:px-2.5',
        sm: 'h-9 min-w-9 px-2 sm:h-8 sm:min-w-8 sm:px-1.5',
      },
      variant: {
        default: 'bg-background',
        outline: cn(
          'border border-input bg-background shadow-black/5 shadow-sm active:bg-accent',
          Platform.select({
            web: 'hover:bg-accent hover:text-accent-foreground',
          }),
        ),
      },
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.RootProps & VariantProps<typeof toggleVariants> & React.RefAttributes<TogglePrimitive.RootRef>) {
  return (
    <TextClassContext.Provider
      value={cn(
        'font-exo2Medium text-foreground text-sm',
        props.pressed ? 'text-accent-foreground' : Platform.select({ web: 'group-hover:text-muted-foreground' }),
        className,
      )}>
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ size, variant }),
          props.disabled && 'opacity-50',
          props.pressed && 'border-primary',
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function ToggleIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn('size-6 shrink-0', textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleVariants };
