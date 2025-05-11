import { type BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import dayjs, { type Dayjs } from 'dayjs';
import { useRef } from 'react';
import { type FieldValues, type UseControllerProps, useController } from 'react-hook-form';
import { Pressable } from 'react-native';
import i18n from '~src/i18n.config';
import { formatDate } from '~src/utils/format.utils';
import { CalendarInput, VStack } from '~ui/components';
import Calendar from '~ui/components/ui/calendar';
import BottomSheetWrapper from '../menu/bottomSheetWrapper.component';
import FormControlWrapper from './formControlWrapper.component';
import type { InputWrapperProps } from './inputWrapper.component';

export type CalendarInputWrapperProps = InputWrapperProps & {
  dateFormat?: string;
};

const CalendarInputWrapper = <T extends FieldValues>(props: CalendarInputWrapperProps & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control: props.control, name: props.name });

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { placeholder, helperText, formControlProps, inputProps, dateFormat = 'L LT' } = props;

  const onChangeDate = (date: Dayjs) => {
    field.onChange(formatDate(date, 'YYYY-MM-DD'));
  };

  return (
    <>
      <FormControlWrapper
        name={props.name}
        placeholder={placeholder}
        helperText={helperText}
        error={error?.message}
        {...formControlProps}>
        <Pressable onPress={() => bottomSheetRef.current?.present()}>
          <CalendarInput
            aria-labelledby={`${props.name}-item`}
            placeholder={placeholder}
            value={field.value != null ? formatDate(field.value, dateFormat) : ''}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            className={invalid ? 'border-destructive' : ''}
            editable={!formControlProps?.isDisabled}
            {...inputProps}
          />
        </Pressable>
      </FormControlWrapper>

      <BottomSheetWrapper ref={bottomSheetRef}>
        <BottomSheetView>
          <VStack className='gap-4 p-4'>
            <Calendar
              mode='single'
              date={field.value}
              onChange={({ date }) => onChangeDate(dayjs(date))}
              locale={i18n.language}
            />
          </VStack>
        </BottomSheetView>
      </BottomSheetWrapper>
    </>
  );
};

export default CalendarInputWrapper;
