import type { PricesInfosData } from '~src/modules/collection/types/pricesInfosData.type';
import { renderWithProviders, screen } from '~src/test/render.utils';
import PricesInfos from './pricesInfos.component';

const buildData = (total: number): PricesInfosData => ({
  fees: 0,
  name: 'Graflex',
  price: 0,
  sellingPrice: 0,
  total,
  workPrice: 0,
});

describe('PricesInfos', () => {
  it('computes the total, minimum, maximum and average', async () => {
    await renderWithProviders(<PricesInfos data={[buildData(100), buildData(50), buildData(150)]} />);

    expect(screen.getByText('300,00 €')).toBeTruthy(); // total
    expect(screen.getByText('50,00 €')).toBeTruthy(); // minimum
    expect(screen.getByText('150,00 €')).toBeTruthy(); // maximum
    expect(screen.getByText('100,00 €')).toBeTruthy(); // average
  });

  it('renders a zero total/average for an empty dataset', async () => {
    await renderWithProviders(<PricesInfos data={[]} />);

    // Math.min()/Math.max() of an empty array yield ±Infinity, not 0 — the `?? 0` fallback in the
    // component only covers null/undefined, so this is the actual (if surprising) current behavior.
    expect(screen.getAllByText('0,00 €').length).toBe(2); // total and average
    expect(screen.getByText('∞ €')).toBeTruthy(); // minimum
    expect(screen.getByText('-∞ €')).toBeTruthy(); // maximum
  });
});
