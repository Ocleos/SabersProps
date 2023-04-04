import { isNil } from 'lodash';
import { IInputProps, Input } from 'native-base';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

const InputWrapper = <T extends FieldValues>(props: IInputProps & UseControllerProps<T>) => {
  const { field } = useController({ control: props.control, name: props.name });

  return (
    <Input
      value={!isNil(field.value) ? `${field.value}` : ''}
      onBlur={field.onBlur}
      onChangeText={(entryValue) => {
        let newValue = entryValue;
        if (props.keyboardType === 'decimal-pad' || props.keyboardType === 'numeric') {
          newValue = entryValue.replace(',', '.');
        }

        field.onChange(newValue);
      }}
      {...props}
    />
  );
};

export default InputWrapper;
