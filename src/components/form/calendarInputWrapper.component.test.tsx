import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useForm } from 'react-hook-form';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { renderWithProviders, screen } from '~src/test/render.utils';
import CalendarInputWrapper from './calendarInputWrapper.component';

type FormValues = { date: string | null };

const Harness: React.FC<{ defaultDate?: string | null }> = ({ defaultDate = null }) => {
  const { control } = useForm<FormValues>({ defaultValues: { date: defaultDate } });

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <CalendarInputWrapper control={control} dateFormat='YYYY-MM-DD' name='date' placeholder='Purchase date' />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

// The date picker lives inside a BottomSheetWrapper and only mounts once `.present()` is called
// imperatively via ref — same limitation as BottomSheetWrapper itself. Only the closed-state
// rendering (label, formatted value) can be exercised here.
describe('CalendarInputWrapper', () => {
  it('renders the placeholder as the field label', async () => {
    await renderWithProviders(<Harness />);

    expect(screen.getAllByText('Purchase date').length).toBeGreaterThan(0);
  });

  it('renders an empty input when no date is selected', async () => {
    await renderWithProviders(<Harness />);

    expect(screen.getByPlaceholderText('Purchase date').props.value).toBe('');
  });

  it('renders the formatted date when the field already has a value', async () => {
    await renderWithProviders(<Harness defaultDate='2024-03-15' />);

    expect(screen.getByPlaceholderText('Purchase date').props.value).toBe('2024-03-15');
  });
});
