import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import FilterSearchWrapper from './filterSearchWrapper.component';

describe('FilterSearchWrapper', () => {
  it('does not call onSearchValue on mount', async () => {
    const onSearchValue = jest.fn();
    await renderWithProviders(<FilterSearchWrapper onSearchValue={onSearchValue} searchValue='' />);

    expect(onSearchValue).not.toHaveBeenCalled();
  });

  it('does not call onSearchValue before the debounce delay has elapsed', async () => {
    const onSearchValue = jest.fn();
    await renderWithProviders(<FilterSearchWrapper onSearchValue={onSearchValue} searchValue='' />);

    fireEvent.changeText(screen.getByPlaceholderText('Rechercher'), 'Graflex');

    expect(onSearchValue).not.toHaveBeenCalled();
  });

  it('calls onSearchValue with the lowercased input once the debounce delay has elapsed', async () => {
    const onSearchValue = jest.fn();
    await renderWithProviders(<FilterSearchWrapper onSearchValue={onSearchValue} searchValue='' />);

    fireEvent.changeText(screen.getByPlaceholderText('Rechercher'), 'Graflex');

    await waitFor(() => expect(onSearchValue).toHaveBeenCalledWith('graflex'));
  });

  it('clears the search when the clear button is pressed', async () => {
    const onSearchValue = jest.fn();
    await renderWithProviders(<FilterSearchWrapper onSearchValue={onSearchValue} searchValue='graflex' />);

    fireEvent.press(screen.getByRole('button'));

    expect(onSearchValue).toHaveBeenCalledWith('');
  });

  it('does not render a filter button when onOpenFilter is not provided', async () => {
    await renderWithProviders(<FilterSearchWrapper onSearchValue={jest.fn()} searchValue='' />);

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('calls onOpenFilter when the filter button is pressed', async () => {
    const onOpenFilter = jest.fn();
    await renderWithProviders(
      <FilterSearchWrapper onOpenFilter={onOpenFilter} onSearchValue={jest.fn()} searchValue='' />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.press(buttons[buttons.length - 1]);

    expect(onOpenFilter).toHaveBeenCalledTimes(1);
  });
});
