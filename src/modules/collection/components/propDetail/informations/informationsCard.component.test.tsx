import type { PropDetail } from '~src/modules/collection/types/propDetail.type';
import { renderWithProviders, screen } from '~src/test/render.utils';
import InformationsCard from './informationsCard.component';

const prop: PropDetail = {
  character: 'Kylo Ren',
  chassisDesigner: 'Kalen',
  components: [],
  manufacturer: 'KRSabers',
  name: 'Graflex',
  soundboard: 'Proffieboard',
  state: 1,
  type: 1,
};

describe('InformationsCard', () => {
  it('renders the manufacturer, chassis designer, soundboard and character', async () => {
    await renderWithProviders(<InformationsCard prop={prop} />);

    expect(screen.getByText('KRSabers')).toBeTruthy();
    expect(screen.getByText('Kalen')).toBeTruthy();
    expect(screen.getByText('Proffieboard')).toBeTruthy();
    expect(screen.getByText('Kylo Ren')).toBeTruthy();
  });

  it('renders the informations title', async () => {
    await renderWithProviders(<InformationsCard prop={prop} />);

    expect(screen.getByText('Informations')).toBeTruthy();
  });
});
