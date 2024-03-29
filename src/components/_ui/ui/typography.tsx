import * as React from 'react';
import { Platform, Text as RNText } from 'react-native';
import { cn } from '~src/components/_ui/lib/utils';
import * as Slot from '~src/components/_ui/primitives/slot';
import type { SlottableTextProps, TextRef } from '~src/components/_ui/primitives/types';

const H1 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role='heading'
      aria-level='1'
      className={cn(
        'font-exo2ExtraBold text-4xl text-foreground tracking-tight web:select-text web:scroll-m-20 lg:text-5xl',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

H1.displayName = 'H1';

const H2 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role='heading'
      aria-level='2'
      className={cn(
        'border-border border-b pb-2 font-exo2SemiBold text-3xl text-foreground tracking-tight first:mt-0 web:select-text web:scroll-m-20',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

H2.displayName = 'H2';

const H3 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role='heading'
      aria-level='3'
      className={cn(
        'font-exo2SemiBold text-2xl text-foreground tracking-tight web:select-text web:scroll-m-20',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

H3.displayName = 'H3';

const H4 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      role='heading'
      aria-level='4'
      className={cn(
        'font-exo2SemiBold text-foreground text-xl tracking-tight web:select-text web:scroll-m-20',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

H4.displayName = 'H4';

const P = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('text-base text-foreground web:select-text', className)} ref={ref} {...props} />;
});
P.displayName = 'P';

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      // @ts-ignore - role of blockquote renders blockquote element on the web
      role={Platform.OS === 'web' ? 'blockquote' : undefined}
      className={cn(
        'mt-6 border-border border-l-2 pl-6 text-base text-foreground italic native:mt-4 web:select-text native:pl-3',
        className,
      )}
      ref={ref}
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
      role={Platform.OS === 'web' ? 'code' : undefined}
      className={cn(
        'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-exo2SemiBold text-foreground text-sm web:select-text',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Code.displayName = 'Code';

const Lead = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('text-muted-foreground text-xl web:select-text', className)} ref={ref} {...props} />;
});

Lead.displayName = 'Lead';

const Large = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn('font-exo2SemiBold text-foreground text-xl web:select-text', className)}
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
      className={cn('font-exo2Medium text-foreground text-sm leading-none web:select-text', className)}
      ref={ref}
      {...props}
    />
  );
});

Small.displayName = 'Small';

const Muted = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText;
  return <Component className={cn('text-muted-foreground text-sm web:select-text', className)} ref={ref} {...props} />;
});

Muted.displayName = 'Muted';

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
