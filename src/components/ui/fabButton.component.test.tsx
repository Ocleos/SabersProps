import { Text } from 'react-native';
import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import FabButton from './fabButton.component';

describe('FabButton', () => {
  it('renders its children', async () => {
    await renderWithProviders(
      <FabButton onPress={jest.fn()}>
        <Text>+</Text>
      </FabButton>,
    );

    expect(screen.getByText('+')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await renderWithProviders(
      <FabButton onPress={onPress}>
        <Text>+</Text>
      </FabButton>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
