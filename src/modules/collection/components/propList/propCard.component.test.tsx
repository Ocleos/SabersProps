import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import { useCollectionStore } from '../../stores/collection.store';
import type { Prop } from '../../types/prop.type';
import PropCard from './propCard.component';

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ navigate: mockNavigate }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
}));

const prop: Prop = {
  character: 'Kylo Ren',
  chassisDesigner: 'Kalen',
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  soundboard: 'Proffieboard',
  state: 1,
  type: 1,
};

beforeEach(() => {
  useCollectionStore.setState(useCollectionStore.getInitialState(), true);
});

describe('PropCard', () => {
  it('renders the prop details', async () => {
    await renderWithProviders(<PropCard prop={prop} />);

    expect(screen.getByText('Graflex')).toBeTruthy();
    expect(screen.getByText('Kylo Ren')).toBeTruthy();
    expect(screen.getByText('KRSabers')).toBeTruthy();
    expect(screen.getByText('Kalen')).toBeTruthy();
    expect(screen.getByText('Proffieboard')).toBeTruthy();
  });

  it('navigates to the prop details on press', async () => {
    await renderWithProviders(<PropCard prop={prop} />);

    fireEvent.press(screen.getByText('Graflex'));

    expect(mockNavigate).toHaveBeenCalledWith('/(root)/collection/prop-1/informations');
  });
});
