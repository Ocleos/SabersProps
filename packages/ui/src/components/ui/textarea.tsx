import { Platform, TextInput, type TextInputProps } from 'react-native';
import { cn } from '~ui/lib/utils';

function Textarea({
  className,
  multiline = true,
  numberOfLines = Platform.select({ native: 8, web: 2 }), // On web, numberOfLines also determines initial height. On native, it determines the maximum height.
  placeholderClassName,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'flex min-h-16 w-full flex-row rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground shadow-black/5 shadow-sm md:text-sm dark:bg-input/30',
        'bg-background font-exo2 focus:border-primary active:border-primary dark:bg-background', // override
        Platform.select({
          web: 'field-sizing-content resize-y outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        }),
        props.editable === false && 'opacity-50',
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
