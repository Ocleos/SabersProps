import type { InputProps } from 'heroui-native/input';
import { useForm, useWatch } from 'react-hook-form';
import { Text } from 'react-native';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import InputWrapper from './inputWrapper.component';

type FormValues = { name: string };

const Harness: React.FC<{ helperText?: string; inputProps?: InputProps }> = ({ helperText, inputProps }) => {
  const { control } = useForm<FormValues>({ defaultValues: { name: '' } });
  const name = useWatch({ control, name: 'name' });

  return (
    <>
      <InputWrapper control={control} helperText={helperText} inputProps={inputProps} name='name' placeholder='Name' />
      <Text testID='watched-value'>{name}</Text>
    </>
  );
};

describe('InputWrapper', () => {
  it('renders the placeholder as the field label', async () => {
    await renderWithProviders(<Harness />);

    expect(screen.getAllByText('Name').length).toBeGreaterThan(0);
  });

  it('renders the helper text when provided', async () => {
    await renderWithProviders(<Harness helperText='Manufacturer name' />);

    expect(screen.getByText('Manufacturer name')).toBeTruthy();
  });

  it('propagates typed text to the form field', async () => {
    await renderWithProviders(<Harness />);

    fireEvent.changeText(screen.getByPlaceholderText('Name'), 'Graflex');

    await waitFor(() => expect(screen.getByTestId('watched-value').props.children).toBe('Graflex'));
  });

  it('normalizes a comma to a dot for decimal-pad fields', async () => {
    await renderWithProviders(<Harness inputProps={{ keyboardType: 'decimal-pad' }} />);

    fireEvent.changeText(screen.getByPlaceholderText('Name'), '12,5');

    await waitFor(() => expect(screen.getByTestId('watched-value').props.children).toBe('12.5'));
  });
});
