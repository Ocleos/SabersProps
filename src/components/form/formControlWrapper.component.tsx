import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from '@gluestack-ui/themed';
import { AlertOctagon } from 'lucide-react-native';
import React from 'react';

export type FormControlProps = {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

type FormControlWrapperProps = {
  placeholder?: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
} & FormControlProps;

const FormControlWrapper: React.FC<FormControlWrapperProps> = (props) => {
  const { placeholder, error, helperText, children } = props;

  return (
    <FormControl
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      isReadOnly={props.isReadOnly}
      isRequired={props.isRequired}>
      <FormControlLabel>
        <FormControlLabelText>{placeholder}</FormControlLabelText>
      </FormControlLabel>

      {children}

      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>{helperText}</FormControlHelperText>
        </FormControlHelper>
      )}

      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertOctagon} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
};

export default FormControlWrapper;
