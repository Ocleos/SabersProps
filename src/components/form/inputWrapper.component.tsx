import { Input, InputField } from '@gluestack-ui/themed';
import { isNil } from 'lodash';
import type { ComponentProps } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import FormControlWrapper, { type FormControlProps } from './formControlWrapper.component';

type InputWrapperProps = {
  placeholder?: string;
  helperText?: string;
  formControlProps?: FormControlProps;
  inputProps?: ComponentProps<typeof InputField>;
};

const InputWrapper = <T extends FieldValues>(props: InputWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, helperText, formControlProps, inputProps } = props;

  return (
    <FormControlWrapper
      placeholder={placeholder}
      helperText={helperText}
      error={error?.message}
      isInvalid={invalid}
      {...formControlProps}>
      <Input>
        <InputField
          placeholder={placeholder}
          value={!isNil(field.value) ? `${field.value}` : ''}
          onBlur={field.onBlur}
          onChangeText={(entryValue) => {
            let newValue = entryValue;
            if (inputProps?.keyboardType === 'decimal-pad' || inputProps?.keyboardType === 'numeric') {
              newValue = entryValue.replace(',', '.');
            }

            field.onChange(newValue);
          }}
          {...inputProps}
        />
      </Input>
    </FormControlWrapper>
  );
};

export default InputWrapper;
