import * as Slot from '@rn-primitives/slot';
import type * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~ui/lib/utils';

type TypographyProps = React.ComponentProps<typeof RNText> & {
  ref?: React.RefObject<RNText>;
  asChild?: boolean;
};

function H1({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='1'
      className={cn(
        'web:select-text web:scroll-m-20 font-exo2ExtraBold text-4xl text-foreground tracking-tight lg:text-5xl',
        className,
      )}
      {...props}
    />
  );
}

function H2({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='2'
      className={cn(
        'web:select-text web:scroll-m-20 border-border border-b pb-2 font-exo2SemiBold text-3xl text-foreground tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  );
}

function H3({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='3'
      className={cn(
        'web:select-text web:scroll-m-20 font-exo2SemiBold text-2xl text-foreground tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function H4({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='4'
      className={cn(
        'web:select-text web:scroll-m-20 font-exo2SemiBold text-foreground text-xl tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function P({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('web:select-text text-base text-foreground', className)} {...props} />;
}

function BlockQuote({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        'mt-6 native:mt-4 web:select-text border-border border-l-2 native:pl-3 pl-6 text-base text-foreground italic',
        className,
      )}
      {...props}
    />
  );
}

function Code({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn(
        'relative web:select-text rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-exo2SemiBold text-foreground text-sm',
        className,
      )}
      {...props}
    />
  );
}

function Lead({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('web:select-text text-muted-foreground text-xl', className)} {...props} />;
}

function Large({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component className={cn('web:select-text font-exo2SemiBold text-foreground text-xl', className)} {...props} />
  );
}

function Small({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn('web:select-text font-exo2Medium text-foreground text-sm leading-none', className)}
      {...props}
    />
  );
}

function Muted({ className, asChild = false, ...props }: TypographyProps) {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('web:select-text text-muted-foreground text-sm', className)} {...props} />;
}

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
