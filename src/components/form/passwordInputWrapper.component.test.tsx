import { useForm, useWatch } from 'react-hook-form';
import { Text } from 'react-native';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import PasswordInputWrapper from './passwordInputWrapper.component';

type FormValues = { password: string };

const Harness: React.FC = () => {
  const { control } = useForm<FormValues>({ defaultValues: { password: '' } });
  const password = useWatch({ control, name: 'password' });

  return (
    <>
      <PasswordInputWrapper control={control} name='password' placeholder='Password' />
      <Text testID='watched-value'>{password}</Text>
    </>
  );
};

describe('PasswordInputWrapper', () => {
  it('masks the input by default', async () => {
    await renderWithProviders(<Harness />);

    expect(screen.getByPlaceholderText('Password').props.secureTextEntry).toBe(true);
  });

  it('reveals the input when the eye button is pressed', async () => {
    await renderWithProviders(<Harness />);

    fireEvent.press(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByPlaceholderText('Password').props.secureTextEntry).toBe(false));
  });

  it('propagates typed text to the form field', async () => {
    await renderWithProviders(<Harness />);

    fireEvent.changeText(screen.getByPlaceholderText('Password'), 's3cret');

    await waitFor(() => expect(screen.getByTestId('watched-value').props.children).toBe('s3cret'));
  });
});
