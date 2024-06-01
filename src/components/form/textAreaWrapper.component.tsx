import { isNil } from 'lodash';
import type { ComponentProps } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { cn } from '~rnr/lib/utils';
import { Textarea } from '~rnr/ui/textarea';
import FormControlWrapper, { type FormControlProps } from './formControlWrapper.component';

type TextAreaWrapperProps = {
  placeholder?: string;
  helperText?: string;
  formControlProps?: FormControlProps;
  inputProps?: ComponentProps<typeof Textarea>;
};

const TextAreaWrapper = <T extends FieldValues>(props: TextAreaWrapperProps & UseControllerProps<T>) => {
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
      name={props.name}
      placeholder={placeholder}
      helperText={helperText}
      error={error?.message}
      {...formControlProps}>
      <Textarea
        aria-labelledby={`${props.name}-item`}
        className={cn('h-40', invalid ? 'border-destructive' : '')}
        placeholder={placeholder}
        value={!isNil(field.value) ? `${field.value}` : ''}
        onBlur={field.onBlur}
        onChangeText={onChange}
        editable={!formControlProps?.isDisabled}
        {...inputProps}
      />
    </FormControlWrapper>
  );
};

export default TextAreaWrapper;
