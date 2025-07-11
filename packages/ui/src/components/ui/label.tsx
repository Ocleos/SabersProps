import * as LabelPrimitive from '@rn-primitives/label';
import type * as React from 'react';
import { cn } from '~ui/lib/utils';

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...props
}: LabelPrimitive.TextProps & {
  ref?: React.RefObject<LabelPrimitive.TextRef>;
}) {
  return (
    <LabelPrimitive.Root
      className='web:cursor-default'
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <LabelPrimitive.Text
        className={cn(
          'font-exo2Medium native:text-base text-foreground text-sm leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70',
          className,
        )}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
