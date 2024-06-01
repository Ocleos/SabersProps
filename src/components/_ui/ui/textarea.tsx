import * as React from 'react';
import { TextInput } from 'react-native';
import { cn } from '~rnr/lib/utils';

const Textarea = React.forwardRef<React.ElementRef<typeof TextInput>, React.ComponentPropsWithoutRef<typeof TextInput>>(
  ({ className, multiline = true, numberOfLines = 4, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 font-exo2 text-base text-foreground web:flex active:border-primary focus:border-primary lg:text-sm native:text-lg placeholder:text-muted-foreground native:leading-[1.25] web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 web:ring-offset-background',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className,
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical='top'
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
