import { cn, Textarea } from '@sabersprops/ui';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import FormControlWrapper, { type FormControlProps } from './formControlWrapper.component';

type TextAreaWrapperProps = {
  placeholder?: string;
  helperText?: string;
  formControlProps?: FormControlProps;
  inputProps?: React.ComponentProps<typeof Textarea>;
};

const TextAreaWrapper = <T extends FieldValues>(props: TextAreaWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, helperText, formControlProps, inputProps } = props;

  const onChange = (entryValue: string) => {
    let newValue = entryValue;
    if (inputProps?.keyboardType === 'decimal-pad' || inputProps?.keyboardType === 'numeric') {
      newValue = entryValue.replace(',', '.');
    }

    field.onChange(newValue);
  };

  return (
    <FormControlWrapper
      error={error?.message}
      helperText={helperText}
      name={props.name}
      placeholder={placeholder}
      {...formControlProps}>
      <Textarea
        aria-labelledby={`${props.name}-item`}
        className={cn('h-40', invalid ? 'border-destructive' : '')}
        editable={!formControlProps?.isDisabled}
        onBlur={field.onBlur}
        onChangeText={onChange}
        placeholder={placeholder}
        value={field.value != null ? `${field.value}` : ''}
        {...inputProps}
      />
    </FormControlWrapper>
  );
};

export default TextAreaWrapper;
