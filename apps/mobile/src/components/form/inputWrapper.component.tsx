import { Input } from '@sabersprops/ui';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import FormControlWrapper, { type FormControlProps } from './formControlWrapper.component';

export type InputWrapperProps = {
  placeholder?: string;
  helperText?: string;
  formControlProps?: FormControlProps;
  inputProps?: React.ComponentProps<typeof Input>;
};

const InputWrapper = <T extends FieldValues>(props: InputWrapperProps & UseControllerProps<T>) => {
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
      name={props.name}
      placeholder={placeholder}
      helperText={helperText}
      error={error?.message}
      {...formControlProps}>
      <Input
        aria-labelledby={`${props.name}-item`}
        placeholder={placeholder}
        value={field.value != null ? `${field.value}` : ''}
        onBlur={field.onBlur}
        onChangeText={onChange}
        className={invalid ? 'border-destructive' : ''}
        editable={!formControlProps?.isDisabled}
        {...inputProps}
      />
    </FormControlWrapper>
  );
};

export default InputWrapper;
