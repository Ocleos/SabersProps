import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Platform, Text as RNText } from 'react-native';
import { cn } from '~ui/lib/utils';

const H1 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='1'
      className={cn(
        'web:select-text web:scroll-m-20 font-exo2ExtraBold text-4xl text-foreground tracking-tight lg:text-5xl',
        className,
      )}
      ref={ref}
      role='heading'
      {...props}
    />
  );
});

H1.displayName = 'H1';

const H2 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='2'
      className={cn(
        'web:select-text web:scroll-m-20 border-border border-b pb-2 font-exo2SemiBold text-3xl text-foreground tracking-tight first:mt-0',
        className,
      )}
      ref={ref}
      role='heading'
      {...props}
    />
  );
});

H2.displayName = 'H2';

const H3 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='3'
      className={cn(
        'web:select-text web:scroll-m-20 font-exo2SemiBold text-2xl text-foreground tracking-tight',
        className,
      )}
      ref={ref}
      role='heading'
      {...props}
    />
  );
});

H3.displayName = 'H3';

const H4 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level='4'
      className={cn(
        'web:select-text web:scroll-m-20 font-exo2SemiBold text-foreground text-xl tracking-tight',
        className,
      )}
      ref={ref}
      role='heading'
      {...props}
    />
  );
});

H4.displayName = 'H4';

const P = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('web:select-text text-base text-foreground', className)} ref={ref} {...props} />;
});

P.displayName = 'P';

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      className={cn(
        'mt-6 native:mt-4 web:select-text border-border border-l-2 native:pl-3 pl-6 text-base text-foreground italic',
        className,
      )}
      ref={ref}
      role={Platform.OS === 'web' ? 'blockquote' : undefined}
      {...props}
    />
  );
});

BlockQuote.displayName = 'BlockQuote';

const Code = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of code renders code element on the web
      className={cn(
        'relative web:select-text rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-exo2SemiBold text-foreground text-sm',
        className,
      )}
      ref={ref}
      role={Platform.OS === 'web' ? 'code' : undefined}
      {...props}
    />
  );
});

Code.displayName = 'Code';

const Lead = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('web:select-text text-muted-foreground text-xl', className)} ref={ref} {...props} />;
});

Lead.displayName = 'Lead';

const Large = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn('web:select-text font-exo2SemiBold text-foreground text-xl', className)}
      ref={ref}
      {...props}
    />
  );
});

Large.displayName = 'Large';

const Small = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn('web:select-text font-exo2Medium text-foreground text-sm leading-none', className)}
      ref={ref}
      {...props}
    />
  );
});

Small.displayName = 'Small';

const Muted = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('web:select-text text-muted-foreground text-sm', className)} ref={ref} {...props} />;
});

Muted.displayName = 'Muted';

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
