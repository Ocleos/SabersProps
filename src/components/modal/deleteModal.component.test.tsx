import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import DeleteModal from './deleteModal.component';

describe('DeleteModal', () => {
  it('renders the delete title and description', async () => {
    await renderWithProviders(
      <DeleteModal description='Delete Graflex?' isOpen onClose={jest.fn()} onConfirm={jest.fn()} />,
    );

    expect(screen.getAllByText('Supprimer').length).toBeGreaterThan(0);
    expect(screen.getByText('Delete Graflex?')).toBeTruthy();
  });

  it('calls onConfirm when the delete button is pressed', async () => {
    const onConfirm = jest.fn();
    await renderWithProviders(<DeleteModal isOpen onClose={jest.fn()} onConfirm={onConfirm} />);

    const deleteButtons = screen.getAllByText('Supprimer');
    fireEvent.press(deleteButtons[deleteButtons.length - 1]);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables the delete button while loading', async () => {
    await renderWithProviders(<DeleteModal isLoading isOpen onClose={jest.fn()} onConfirm={jest.fn()} />);

    const deleteButtons = screen.getAllByRole('button');
    const confirmButton = deleteButtons[deleteButtons.length - 1];

    expect(confirmButton.props.accessibilityState.disabled).toBe(true);
  });
});
