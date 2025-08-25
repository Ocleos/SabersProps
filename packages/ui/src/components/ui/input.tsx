import { Platform, TextInput, type TextInputProps } from 'react-native';
import { cn } from '~ui/lib/utils';

function Input({ className, placeholderClassName, ...props }: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'flex h-10 w-full min-w-0 flex-row items-center rounded-md border border-input bg-background px-3 py-1 text-base text-foreground leading-5 shadow-black/5 shadow-sm sm:h-9 dark:bg-input/30',
        'font-exo2 focus:border-primary active:border-primary dark:bg-background', // override
        props.editable === false &&
          cn('opacity-50', Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })),
        Platform.select({
          native: 'placeholder:text-muted-foreground',
          web: cn(
            'outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground md:text-sm',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          ),
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
