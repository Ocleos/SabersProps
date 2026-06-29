import { Description } from 'heroui-native/description';
import { FieldError } from 'heroui-native/field-error';
import { Input, type InputProps } from 'heroui-native/input';
import { Label } from 'heroui-native/label';
import { TextField, type TextFieldRootProps } from 'heroui-native/text-field';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { normalizeFieldValue } from '~src/utils/validator.utils';

type InputWrapperProps = {
  placeholder: string;
  helperText?: string;
  textFieldProps?: TextFieldRootProps;
  inputProps?: InputProps;
};

const InputWrapper = <T extends FieldValues>(props: InputWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, helperText, name, textFieldProps, inputProps } = props;

  const onChange = (entryValue: string) => {
    field.onChange(normalizeFieldValue(entryValue, inputProps?.keyboardType));
  };

  return (
    <TextField {...textFieldProps} isInvalid={invalid}>
      <Label nativeID={`${name}-item`}>{placeholder}</Label>

      <Input
        aria-labelledby={`${name}-item`}
        onBlur={field.onBlur}
        onChangeText={onChange}
        placeholder={placeholder}
        value={field.value != null ? `${field.value}` : ''}
        {...inputProps}
      />

      {helperText && <Description>{helperText}</Description>}

      {error && <FieldError>{error.message}</FieldError>}
    </TextField>
  );
};

export default InputWrapper;
