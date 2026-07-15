import type { Repartition } from '~src/modules/collection/types/repartition.type';
import { renderWithProviders, screen } from '~src/test/render.utils';
import RepartitionTable from './repartitionTable.component';

const data: Repartition = {
  states: {
    1: { total: 3, values: [2, 1, 0] },
    2: { total: 0, values: [0, 0, 0] },
    3: { total: 0, values: [0, 0, 0] },
    4: { total: 0, values: [0, 0, 0] },
    5: { total: 0, values: [0, 0, 0] },
    6: { total: 1, values: [0, 0, 1] },
    7: { total: 0, values: [0, 0, 0] },
    8: { total: 0, values: [0, 0, 0] },
  },
  total: 4,
  types: [2, 1, 1],
};

describe('RepartitionTable', () => {
  it('renders a row per state with its label', async () => {
    await renderWithProviders(<RepartitionTable data={data} />);

    expect(screen.getByText('Production')).toBeTruthy();
    expect(screen.getByText('Terminé')).toBeTruthy();
  });

  it('renders the grand total', async () => {
    await renderWithProviders(<RepartitionTable data={data} />);

    expect(screen.getAllByText('4').length).toBeGreaterThan(0);
  });
});
