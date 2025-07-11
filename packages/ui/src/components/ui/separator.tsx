import * as SeparatorPrimitive from '@rn-primitives/separator';
import type * as React from 'react';
import { cn } from '~ui/lib/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorPrimitive.RootProps & {
  ref?: React.RefObject<SeparatorPrimitive.RootRef>;
}) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
}

export { Separator };
