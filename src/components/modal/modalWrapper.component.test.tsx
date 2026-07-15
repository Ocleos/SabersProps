import { Text } from 'react-native';
import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import ModalWrapper from './modalWrapper.component';

describe('ModalWrapper', () => {
  it('renders nothing meaningful when closed', async () => {
    await renderWithProviders(<ModalWrapper isOpen={false} onClose={jest.fn()} title='My modal' />);

    expect(screen.queryByText('My modal')).toBeNull();
  });

  it('renders the title, description and content when open', async () => {
    await renderWithProviders(
      <ModalWrapper
        content={<Text>Extra content</Text>}
        description='Some description'
        isOpen
        onClose={jest.fn()}
        title='My modal'
      />,
    );

    expect(screen.getByText('My modal')).toBeTruthy();
    expect(screen.getByText('Some description')).toBeTruthy();
    expect(screen.getByText('Extra content')).toBeTruthy();
  });

  it('calls onClose when the default close button is pressed', async () => {
    const onClose = jest.fn();
    await renderWithProviders(<ModalWrapper isOpen onClose={onClose} title='My modal' />);

    fireEvent.press(screen.getByText('Fermer'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the cancel button is pressed', async () => {
    const onClose = jest.fn();
    await renderWithProviders(<ModalWrapper hasCancelButton isOpen onClose={onClose} title='My modal' />);

    fireEvent.press(screen.getByText('Annuler'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the given main button instead of the default close button', async () => {
    await renderWithProviders(
      <ModalWrapper isOpen mainButton={<Text>Custom action</Text>} onClose={jest.fn()} title='My modal' />,
    );

    expect(screen.getByText('Custom action')).toBeTruthy();
    expect(screen.queryByText('Fermer')).toBeNull();
  });
});
