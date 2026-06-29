import { Button } from 'heroui-native/button';
import { Description } from 'heroui-native/description';
import { FieldError } from 'heroui-native/field-error';
import { Input, type InputProps } from 'heroui-native/input';
import { InputGroup } from 'heroui-native/input-group';
import { Label } from 'heroui-native/label';
import { TextField, type TextFieldRootProps } from 'heroui-native/text-field';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useState } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { normalizeFieldValue } from '~src/utils/validator.utils';
import { Icon } from '../ui/icon.component';

type PasswordInputWrapperProps = {
  placeholder: string;
  helperText?: string;
  textFieldProps?: TextFieldRootProps;
  inputProps?: InputProps;
};

const PasswordInputWrapper = <T extends FieldValues>(props: PasswordInputWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const [isSecure, setIsSecure] = useState(true);

  const { placeholder, helperText, name, textFieldProps, inputProps } = props;

  const onChange = (entryValue: string) => {
    field.onChange(normalizeFieldValue(entryValue, inputProps?.keyboardType));
  };

  return (
    <TextField {...textFieldProps} isInvalid={invalid}>
      <Label nativeID={`${name}-item`}>{placeholder}</Label>

      <InputGroup>
        <Input
          aria-labelledby={`${name}-item`}
          onBlur={field.onBlur}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          value={field.value != null ? `${field.value}` : ''}
          {...inputProps}
        />

        <InputGroup.Suffix>
          <Button isIconOnly onPress={() => setIsSecure(!isSecure)} variant='ghost'>
            <Icon as={isSecure ? EyeIcon : EyeOffIcon} className='text-accent' />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>

      {helperText && <Description>{helperText}</Description>}

      {error && <FieldError>{error.message}</FieldError>}
    </TextField>
  );
};

export default PasswordInputWrapper;
