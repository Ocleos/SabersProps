import type * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '~ui/lib/utils';

function Textarea({
  className,
  multiline = true,
  numberOfLines = 4,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        'web:flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 font-exo2 native:text-lg text-base text-foreground native:leading-[1.25] web:ring-offset-background placeholder:text-muted-foreground focus:border-primary web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:border-primary lg:text-sm',
        props.editable === false && 'web:cursor-not-allowed opacity-50',
        className,
      )}
      multiline={multiline}
      numberOfLines={numberOfLines}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      textAlignVertical='top'
      {...props}
    />
  );
}

export { Textarea };
