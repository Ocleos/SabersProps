import DateTimePicker, { type DateTimePickerProps, useDefaultClassNames } from 'react-native-ui-datepicker';

const Calendar: React.FC<DateTimePickerProps> = (props) => {
  const defaultClassNames = useDefaultClassNames();

  return (
    <DateTimePicker
      calendar='gregory'
      classNames={{
        ...defaultClassNames,
        day_label: 'web:whitespace-nowrap text-foreground font-exo2',
        month_label: 'web:whitespace-nowrap text-foreground group-active:text-accent-foreground font-exo2',
        month_selector_label: 'font-exo2SemiBold text-lg text-foreground',
        time_label: 'text-foreground text-2xl font-exo2Medium',
        time_selector_label: 'font-exo2SemiBold text-lg text-foreground',
        year_label: 'web:whitespace-nowrap text-foreground group-active:text-accent-foreground font-exo2',
        year_selector_label: 'font-exo2SemiBold text-lg text-foreground',
      }}
      firstDayOfWeek={1}
      initialView='day'
      navigationPosition='around'
      showOutsideDays={true}
      styles={{
        month_label: { textTransform: 'capitalize' },
        month_selector_label: { textTransform: 'capitalize' },
        selected_month_label: { textTransform: 'capitalize' },
      }}
      weekdaysFormat='short'
      {...props}
    />
  );
};

export default Calendar;
