import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { renderWithProviders, screen } from '~src/test/render.utils';
import StatusDetail from './statusDetail.component';

const prop: PropDetail = {
  components: [],
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 6,
  type: 1,
};

describe('StatusDetail', () => {
  it('renders the type and state badges', async () => {
    await renderWithProviders(<StatusDetail prop={prop} />);

    expect(screen.getByText('Lightsaber')).toBeTruthy();
    expect(screen.getByText('Terminé')).toBeTruthy();
  });
});
