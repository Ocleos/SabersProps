import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~rnr/lib/utils';
import * as Slot from '~rnr/primitives/slot';
import type { SlottableTextProps, TextRef } from '~rnr/primitives/types';

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, ...props }, ref) => {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot.Text : RNText;
  return (
    <Component
      className={cn('font-exo2 text-base text-foreground web:select-text', textClass, className)}
      ref={ref}
      {...props}
    />
  );
});
Text.displayName = 'Text';

export { Text, TextClassContext };
