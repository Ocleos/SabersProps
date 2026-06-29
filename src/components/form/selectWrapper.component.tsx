import { ControlField, type ControlFieldProps } from 'heroui-native/control-field';
import { Description } from 'heroui-native/description';
import { FieldError } from 'heroui-native/field-error';
import { useThemeColor } from 'heroui-native/hooks';
import { Label } from 'heroui-native/label';
import { Select, type SelectRootProps } from 'heroui-native/select';
import { cn } from 'heroui-native/utils';
import { useState } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VStack } from '../ui/stack.component';

type SelectOption = {
  value: string;
  label: string;
};

type SelectWrapperProps = {
  placeholder: string;
  helperText?: string;
  controlFieldProps?: ControlFieldProps;
  children: React.ReactNode;
  selectProps?: SelectRootProps;
  initialSelectedValue?: SelectOption;
};

const SelectWrapper = <T extends FieldValues>(props: SelectWrapperProps & UseControllerProps<T>) => {
  const insets = useSafeAreaInsets();
  const [selectTriggerWidth, setSelectTriggerWidth] = useState(0);

  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const [accentColor] = useThemeColor(['accent']);

  const { placeholder, controlFieldProps, name, helperText, children, selectProps, initialSelectedValue } = props;

  return (
    <ControlField {...controlFieldProps} isInvalid={invalid}>
      <VStack className='gap-2'>
        <Label nativeID={`${name}-item`}>{placeholder}</Label>

        <Select
          aria-labelledby={`${name}-item`}
          onValueChange={(option) => field.onChange(option?.value)}
          value={initialSelectedValue}
          {...selectProps}>
          <Select.Trigger
            className={cn('w-full', invalid ? 'border border-danger' : '')}
            isDisabled={controlFieldProps?.isDisabled}
            onLayout={(ev) => setSelectTriggerWidth(ev.nativeEvent.layout.width)}>
            <Select.Value placeholder={placeholder} />
            <Select.TriggerIndicator iconProps={{ color: accentColor }} />
          </Select.Trigger>

          <Select.Portal>
            <Select.Overlay />
            <Select.Content insets={insets} presentation='popover' width={selectTriggerWidth}>
              {children}
            </Select.Content>
          </Select.Portal>
        </Select>

        {helperText && <Description>{helperText}</Description>}

        {error && <FieldError>{error.message}</FieldError>}
      </VStack>
    </ControlField>
  );
};

export default SelectWrapper;
