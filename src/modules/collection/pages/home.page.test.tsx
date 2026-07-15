import type { Prop } from '~src/modules/collection/types/prop.type';
import type { TodoAccessories } from '~src/modules/collection/types/todoAccessories.type';
import { fireEvent, renderWithProviders, screen, waitFor } from '~src/test/render.utils';
import HomePage from './home.page';

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  Stack: { Screen: () => null },
  useIsFocused: () => true,
  useRouter: () => ({ navigate: mockNavigate }),
}));

const props: Prop[] = [
  { manufacturer: 'KRSabers', name: 'Graflex', state: 1, type: 1 },
  { manufacturer: 'KRSabers', name: 'Anakin', state: 6, type: 1 },
  { manufacturer: 'KRSabers', name: 'Blaster', state: 1, type: 2 },
];

const todoAccessories: TodoAccessories[] = [
  { bag: true, name: 'Graflex', prop: true },
  { bag: false, name: 'Anakin', prop: false },
];

const mockGetData = jest.fn().mockImplementation((table: string) => {
  if (table === 'propsAccessories') {
    return Promise.resolve(todoAccessories);
  }
  return Promise.resolve(props);
});

jest.mock('~src/utils/supabase.utils', () => ({
  getData: (...args: unknown[]) => mockGetData(...args),
  PROPS_ACCESSORIES_TABLE: 'propsAccessories',
  PROPS_TABLE: 'props',
}));

describe('HomePage', () => {
  it('renders the computed stats once the data has loaded', async () => {
    await renderWithProviders(<HomePage />);

    await waitFor(() => expect(screen.getByText('2')).toBeTruthy());
    expect(screen.getByText('Sabres lasers')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('Props au total')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('Props en attente')).toBeTruthy();
  });

  it('navigates to the collection list when its nav card is pressed', async () => {
    await renderWithProviders(<HomePage />);

    fireEvent.press(screen.getByText('Collection'));

    expect(mockNavigate).toHaveBeenCalledWith('/(root)/collection/list');
  });

  it('navigates to the stats page when its nav card is pressed', async () => {
    await renderWithProviders(<HomePage />);

    fireEvent.press(screen.getByText('Stats'));

    expect(mockNavigate).toHaveBeenCalledWith('/(root)/collection/stats');
  });

  it('navigates to the todos page when its nav card is pressed', async () => {
    await renderWithProviders(<HomePage />);

    fireEvent.press(screen.getByText('Todos'));

    expect(mockNavigate).toHaveBeenCalledWith('/(root)/collection/todos');
  });
});
