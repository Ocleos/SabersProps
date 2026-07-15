import { useForm, useWatch } from 'react-hook-form';
import { Text } from 'react-native';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import TextAreaWrapper from './textAreaWrapper.component';

type FormValues = { description: string };

const Harness: React.FC<{ helperText?: string }> = ({ helperText }) => {
  const { control } = useForm<FormValues>({ defaultValues: { description: '' } });
  const description = useWatch({ control, name: 'description' });

  return (
    <>
      <TextAreaWrapper control={control} helperText={helperText} name='description' placeholder='Description' />
      <Text testID='watched-value'>{description}</Text>
    </>
  );
};

describe('TextAreaWrapper', () => {
  it('renders the placeholder as the field label', async () => {
    await renderWithProviders(<Harness />);

    expect(screen.getAllByText('Description').length).toBeGreaterThan(0);
  });

  it('renders the helper text when provided', async () => {
    await renderWithProviders(<Harness helperText='Free-form notes' />);

    expect(screen.getByText('Free-form notes')).toBeTruthy();
  });

  it('propagates typed text to the form field', async () => {
    await renderWithProviders(<Harness />);

    fireEvent.changeText(screen.getByPlaceholderText('Description'), 'Some notes about this prop.');

    await waitFor(() => expect(screen.getByTestId('watched-value').props.children).toBe('Some notes about this prop.'));
  });
});
