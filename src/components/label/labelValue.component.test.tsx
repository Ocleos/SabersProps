import { renderWithProviders, screen } from '~src/test/render.utils';
import LabelValue from './labelValue.component';

describe('LabelValue', () => {
  it('renders the title and value', async () => {
    await renderWithProviders(<LabelValue title='Manufacturer' value='KRSabers' />);

    expect(screen.getByText('Manufacturer : ')).toBeTruthy();
    expect(screen.getByText('KRSabers')).toBeTruthy();
  });
});
