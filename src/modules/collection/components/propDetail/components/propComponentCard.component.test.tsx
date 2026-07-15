import type { PropComponent } from '~src/modules/collection/types/propComponent.type';
import { renderWithProviders, screen } from '~src/test/render.utils';
import PropComponentCard from './propComponentCard.component';

jest.mock('expo-router', () => ({
  useRouter: () => ({ navigate: jest.fn() }),
}));

jest.mock('~src/utils/supabase.utils', () => ({
  deleteData: jest.fn(),
}));

const propComponent: PropComponent = {
  date: '2024-03-15',
  fees: 5,
  feesEuros: 5,
  id: 'component-1',
  idProp: 'prop-1',
  label: 'Blade',
  price: 50,
  priceEuros: 50,
  rate: 1,
  seller: 'Amazon',
};

describe('PropComponentCard', () => {
  it('renders the component label, seller and formatted prices', async () => {
    await renderWithProviders(<PropComponentCard propComponent={propComponent} />);

    expect(screen.getByText('Blade')).toBeTruthy();
    expect(screen.getByText('Amazon')).toBeTruthy();
    expect(screen.getByText('50,00 €')).toBeTruthy();
    expect(screen.getByText('5,00 €')).toBeTruthy();
  });
});
