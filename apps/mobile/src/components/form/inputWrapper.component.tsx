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
      error={error?.message}
      helperText={helperText}
      name={props.name}
      placeholder={placeholder}
      {...formControlProps}>
      <Input
        aria-labelledby={`${props.name}-item`}
        className={invalid ? 'border-destructive' : ''}
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

export default InputWrapper;
