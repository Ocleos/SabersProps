import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { PasswordInput } from '~ui/components';
import FormControlWrapper from './formControlWrapper.component';
import type { InputWrapperProps } from './inputWrapper.component';

const PasswordInputWrapper = <T extends FieldValues>(props: InputWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, helperText, formControlProps, inputProps } = props;

  return (
    <FormControlWrapper
      error={error?.message}
      helperText={helperText}
      name={props.name}
      placeholder={placeholder}
      {...formControlProps}>
      <PasswordInput
        aria-labelledby={`${props.name}-item`}
        className={invalid ? 'border-destructive' : ''}
        editable={!formControlProps?.isDisabled}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        placeholder={placeholder}
        value={field.value != null ? `${field.value}` : ''}
        {...inputProps}
      />
    </FormControlWrapper>
  );
};

export default PasswordInputWrapper;
