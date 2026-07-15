import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import FilterSearchWrapper from './filterSearchWrapper.component';

describe('FilterSearchWrapper', () => {
  it('calls onSearchValue with the lowercased input as the user types', async () => {
    const onSearchValue = jest.fn();
    await renderWithProviders(<FilterSearchWrapper onSearchValue={onSearchValue} searchValue='' />);

    fireEvent.changeText(screen.getByPlaceholderText('Rechercher'), 'Graflex');

    expect(onSearchValue).toHaveBeenCalledWith('graflex');
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
