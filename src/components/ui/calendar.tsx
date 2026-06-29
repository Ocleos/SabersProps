import DateTimePicker, { type DateTimePickerProps, useDefaultClassNames } from 'react-native-ui-datepicker';

const Calendar: React.FC<DateTimePickerProps> = (props) => {
  const defaultClassNames = useDefaultClassNames();

  return (
    <DateTimePicker
      calendar='gregory'
      classNames={{
        ...defaultClassNames,
        active_year: 'bg-surface-secondary',
        active_year_label: 'text-surface-secondary-foreground',
        day: 'group rounded-md web:hover:bg-surface-secondary',
        day_label: 'web:whitespace-nowrap text-foreground font-normal',
        disabled_label: 'text-muted opacity-50',
        month: 'group rounded-md web:hover:bg-surface-secondary active:bg-surface-secondary',
        month_label: 'web:whitespace-nowrap text-foreground group-active:text-surface-secondary-foreground font-normal',
        month_selector_label: 'font-semibold text-lg text-foreground',
        outside_label: 'text-muted',
        range_end_label: 'text-accent-foreground',
        range_fill: 'bg-surface-secondary',
        range_middle: 'bg-transparent',
        range_middle_label: 'text-surface-secondary-foreground',
        range_start_label: 'text-accent-foreground',
        selected: 'group bg-accent web:hover:bg-accent web:hover:opacity-90 active:opacity-90',
        selected_label: 'text-accent-foreground',
        selected_month: 'group bg-accent web:hover:bg-accent web:hover:opacity-90 active:opacity-90',
        selected_month_label: 'text-accent-foreground',
        selected_year: 'group bg-accent web:hover:bg-accent web:hover:opacity-90 active:opacity-90',
        selected_year_label: 'text-accent-foreground',
        time_label: 'text-foreground text-2xl font-medium',
        time_selected_indicator: 'bg-muted rounded-lg',
        time_selector_label: 'font-semibold text-lg text-foreground',
        today: 'bg-surface-secondary',
        today_label: 'text-surface-secondary-foreground',
        weekday_label: 'text-sm uppercase text-muted',
        year: 'group rounded-md web:hover:bg-surface-secondary active:bg-surface-secondary',
        year_label: 'web:whitespace-nowrap text-foreground group-active:text-surface-secondary-foreground font-normal',
        year_selector_label: 'font-semibold text-lg text-foreground',
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
