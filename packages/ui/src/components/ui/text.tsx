import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';
import { cn } from '~ui/lib/utils';

const textVariants = cva(
  cn(
    'font-exo2 text-base text-foreground',
    Platform.select({
      web: 'select-text',
    }),
  ),
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        blockquote: 'mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6',
        code: cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-exo2SemiBold font-mono text-sm'),
        default: '',
        h1: cn(
          'text-center font-exo2ExtraBold text-4xl tracking-tight',
          Platform.select({ web: 'scroll-m-20 text-balance' }),
        ),
        h2: cn(
          'border-border border-b pb-2 font-exo2SemiBold text-3xl tracking-tight',
          Platform.select({ web: 'scroll-m-20 first:mt-0' }),
        ),
        h3: cn('font-exo2SemiBold text-2xl tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        h4: cn('font-exo2SemiBold text-xl tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        large: 'font-exo2SemiBold text-lg',
        lead: 'text-muted-foreground text-xl',
        muted: 'text-muted-foreground text-sm',
        p: 'mt-3 leading-7 sm:mt-6',
        small: 'font-exo2Medium text-sm leading-none',
      },
    },
  },
);

type TextVariantProps = VariantProps<typeof textVariants>;

type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  blockquote: Platform.select({ web: 'blockquote' as Role }),
  code: Platform.select({ web: 'code' as Role }),
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof RNText> &
  TextVariantProps &
  React.RefAttributes<RNText> & {
    asChild?: boolean;
  }) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      className={cn(textVariants({ variant }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      {...props}
    />
  );
}

export { Text, TextClassContext };
