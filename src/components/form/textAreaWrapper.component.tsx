import { Description } from 'heroui-native/description';
import { FieldError } from 'heroui-native/field-error';
import { Label } from 'heroui-native/label';
import { TextArea, type TextAreaProps } from 'heroui-native/text-area';
import { TextField, type TextFieldRootProps } from 'heroui-native/text-field';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { normalizeFieldValue } from '~src/utils/validator.utils';

type TextAreaWrapperProps = {
  placeholder: string;
  helperText?: string;
  textFieldProps?: TextFieldRootProps;
  textAreaProps?: TextAreaProps;
};

const TextAreaWrapper = <T extends FieldValues>(props: TextAreaWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, helperText, name, textFieldProps, textAreaProps } = props;

  const onChange = (entryValue: string) => {
    field.onChange(normalizeFieldValue(entryValue, textAreaProps?.keyboardType));
  };

  return (
    <TextField {...textFieldProps} isInvalid={invalid}>
      <Label nativeID={`${name}-item`}>{placeholder}</Label>

      <TextArea
        aria-labelledby={`${name}-item`}
        onBlur={field.onBlur}
        onChangeText={onChange}
        placeholder={placeholder}
        value={field.value != null ? `${field.value}` : ''}
        {...textAreaProps}
      />

      {helperText && <Description>{helperText}</Description>}

      {error && <FieldError>{error.message}</FieldError>}
    </TextField>
  );
};

export default TextAreaWrapper;
