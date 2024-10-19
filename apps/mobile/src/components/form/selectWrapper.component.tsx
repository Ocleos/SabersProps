import { type Option, Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, cn } from '@sabersprops/ui';
import { useState } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FormControlWrapper, { type FormControlProps } from './formControlWrapper.component';

type ISelectWrapperProps = {
  placeholder: string;
  initialSelectedValue?: Option;
  formControlProps?: FormControlProps;
  helperText?: string;
  children: React.ReactNode;
  selectProps?: React.ComponentProps<typeof Select>;
};

const SelectWrapper = <T extends FieldValues>(props: ISelectWrapperProps & UseControllerProps<T>) => {
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = useState(0);

  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { placeholder, initialSelectedValue, formControlProps, helperText, children, selectProps } = props;

  return (
    <FormControlWrapper
      name={props.name}
      placeholder={placeholder}
      helperText={helperText}
      error={error?.message}
      {...formControlProps}>
      <Select
        aria-labelledby={`${props.name}-item`}
        defaultValue={initialSelectedValue}
        onValueChange={(option) => {
          field.onChange(option?.value);
        }}
        {...selectProps}>
        <SelectTrigger
          disabled={formControlProps?.isDisabled}
          className={invalid ? 'border-destructive' : ''}
          onLayout={(ev) => {
            setSelectTriggerWidth(ev.nativeEvent.layout.width);
          }}>
          <SelectValue
            className={cn(
              'font-exo2 native:text-lg text-sm',
              field.value ? 'text-foreground' : 'text-muted-foreground',
            )}
            placeholder={placeholder}
          />
        </SelectTrigger>

        <SelectContent insets={insets} style={{ width: selectTriggerWidth }}>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </FormControlWrapper>
  );
};

export default SelectWrapper;
