import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FormControl, IFormControlProps, Icon } from 'native-base';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface IFormControlWrapperProps extends IFormControlProps {
  label: string;
  helperText?: string;
}

const FormControlWrapper = <T extends FieldValues>(props: IFormControlWrapperProps & UseControllerProps<T>) => {
  const {
    fieldState: { invalid, error },
  } = useController({ control: props.control, name: props.name });

  return (
    <FormControl isInvalid={invalid} {...props}>
      <FormControl.Label>{props.label}</FormControl.Label>
      {props.children}
      {props.helperText && <FormControl.HelperText>{props.helperText}</FormControl.HelperText>}
      {error && (
        <FormControl.ErrorMessage startIcon={<Icon as={MaterialCommunityIcons} name='information-outline' />}>
          {error.message}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default FormControlWrapper;
