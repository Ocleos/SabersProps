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
        error={error?.message}
        helperText={helperText}
        name={props.name}
        placeholder={placeholder}
        {...formControlProps}>
        <Pressable onPress={() => bottomSheetRef.current?.present()}>
          <CalendarInput
            aria-labelledby={`${props.name}-item`}
            className={invalid ? 'border-destructive' : ''}
            editable={!formControlProps?.isDisabled}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder={placeholder}
            value={field.value != null ? formatDate(field.value, dateFormat) : ''}
            {...inputProps}
          />
        </Pressable>
      </FormControlWrapper>

      <BottomSheetWrapper ref={bottomSheetRef}>
        <BottomSheetView>
          <VStack className='gap-4 p-4'>
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
