import DateTimePicker, { useDefaultClassNames } from 'react-native-ui-datepicker';
import type {
  DatePickerMultipleProps,
  DatePickerRangeProps,
  DatePickerSingleProps,
} from 'react-native-ui-datepicker/lib/typescript/datetime-picker';

const Calendar: React.FC<DatePickerSingleProps | DatePickerRangeProps | DatePickerMultipleProps> = (props) => {
  const defaultClassNames = useDefaultClassNames();

  return (
    <DateTimePicker
      calendar='gregory'
      firstDayOfWeek={1}
      initialView='day'
      showOutsideDays={true}
      navigationPosition='around'
      weekdaysFormat='short'
      classNames={{
        ...defaultClassNames,
        day_label: 'web:whitespace-nowrap text-foreground font-exo2',
        month_label: 'web:whitespace-nowrap text-foreground group-active:text-accent-foreground font-exo2',
        year_label: 'web:whitespace-nowrap text-foreground group-active:text-accent-foreground font-exo2',
        month_selector_label: 'font-exo2SemiBold text-lg text-foreground',
        year_selector_label: 'font-exo2SemiBold text-lg text-foreground',
        time_selector_label: 'font-exo2SemiBold text-lg text-foreground',
        time_label: 'text-foreground text-2xl font-exo2Medium',
      }}
      styles={{
        month_label: { textTransform: 'capitalize' },
        month_selector_label: { textTransform: 'capitalize' },
        selected_month_label: { textTransform: 'capitalize' },
      }}
      {...props}
    />
  );
};

export default Calendar;
