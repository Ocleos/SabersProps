import {
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import FormControlWrapper, { FormControlProps } from './formControlWrapper.component';

type ISelectWrapperProps = {
  placeholder?: string;
  initialSelectedLabel?: string;
  formControlProps?: FormControlProps;
  helperText?: string;
  children: React.ReactNode;
};

const SelectWrapper = <T extends FieldValues>(props: ISelectWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, initialSelectedLabel, formControlProps, helperText, children } = props;

  return (
    <FormControlWrapper
      placeholder={placeholder}
      helperText={helperText}
      error={error?.message}
      isInvalid={invalid}
      {...formControlProps}>
      <Select
        selectedValue={field.value ? field.value.toString() : undefined}
        selectedLabel={initialSelectedLabel}
        onValueChange={field.onChange}>
        <SelectTrigger>
          <SelectInput placeholder={placeholder} />
          <SelectIcon mr={'$4'}>
            <Icon as={ChevronDown} />
          </SelectIcon>
        </SelectTrigger>

        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {children}
          </SelectContent>
        </SelectPortal>
      </Select>
    </FormControlWrapper>
  );
};

export default SelectWrapper;
