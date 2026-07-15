import type { PropComponent } from '~src/modules/collection/types/propComponent.type';
import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import ComponentCard from './componentCard.component';

const mockNavigate = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: () => ({ navigate: mockNavigate }),
}));

const prop: PropDetail = {
  components: [{} as PropComponent, {} as PropComponent],
  id: 'prop-1',
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
};

describe('ComponentCard', () => {
  it('renders the components title and count', async () => {
    await renderWithProviders(<ComponentCard prop={prop} />);

    expect(screen.getByText('Composants')).toBeTruthy();
    expect(screen.getByText('2 composants')).toBeTruthy();
  });

  it('navigates to the components list on press', async () => {
    await renderWithProviders(<ComponentCard prop={prop} />);

    fireEvent.press(screen.getByText('Composants'));

    expect(mockNavigate).toHaveBeenCalledWith('/(root)/collection/prop-1/components');
  });
});
