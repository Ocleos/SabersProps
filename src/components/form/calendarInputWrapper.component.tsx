import { type BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs, { type Dayjs } from 'dayjs';
import { Description } from 'heroui-native/description';
import { FieldError } from 'heroui-native/field-error';
import { Input, type InputProps } from 'heroui-native/input';
import { InputGroup } from 'heroui-native/input-group';
import { Label } from 'heroui-native/label';
import { PressableFeedback } from 'heroui-native/pressable-feedback';
import { TextField, type TextFieldRootProps } from 'heroui-native/text-field';
import { CalendarDaysIcon } from 'lucide-react-native';
import { useRef } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import i18n from '~src/i18n.config';
import { formatDate } from '~src/utils/format.utils';
import BottomSheetWrapper from '../menu/bottomSheetWrapper.component';
import Calendar from '../ui/calendar';
import { Icon } from '../ui/icon.component';
import { VStack } from '../ui/stack.component';

type CalendarInputWrapperProps = {
  placeholder: string;
  helperText?: string;
  textFieldProps?: TextFieldRootProps;
  inputProps?: InputProps;
  dateFormat?: string;
};

const CalendarInputWrapper = <T extends FieldValues>(props: CalendarInputWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const { bottom } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { placeholder, helperText, name, textFieldProps, inputProps, dateFormat = 'L LT' } = props;

  const onChangeDate = (date: Dayjs) => {
    field.onChange(formatDate(date, 'YYYY-MM-DD'));
  };

  return (
    <>
      <TextField {...textFieldProps} isInvalid={invalid}>
        <Label nativeID={`${name}-item`}>{placeholder}</Label>

        <PressableFeedback onPress={() => bottomSheetRef.current?.present()}>
          <InputGroup>
            <Input
              aria-labelledby={`${name}-item`}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              placeholder={placeholder}
              readOnly={true}
              value={field.value != null ? formatDate(field.value, dateFormat) : ''}
              {...inputProps}
            />

            <InputGroup.Suffix>
              <Icon as={CalendarDaysIcon} className='text-accent' />
            </InputGroup.Suffix>
          </InputGroup>
        </PressableFeedback>

        {helperText && <Description>{helperText}</Description>}

        {error && <FieldError>{error.message}</FieldError>}
      </TextField>

      <BottomSheetWrapper ref={bottomSheetRef}>
        <BottomSheetView>
          <VStack className='gap-4 p-4' style={{ marginBottom: bottom }}>
            <Calendar
              date={field.value}
              locale={i18n.language}
              mode='single'
              onChange={({ date }) => onChangeDate(dayjs(date))}
            />
          </VStack>
        </BottomSheetView>
      </BottomSheetWrapper>
    </>
  );
};

export default CalendarInputWrapper;
