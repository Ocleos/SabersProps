import type { Prop } from '~src/modules/collection/types/prop.type';
import { calculateRepartition } from './repartition.utils';

const buildProp = (overrides: Partial<Prop>): Prop => ({
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
  ...overrides,
});

describe('calculateRepartition', () => {
  it('returns an empty-but-initialized repartition for no props', () => {
    const result = calculateRepartition([]);

    expect(result.total).toBe(0);
    expect(result.types).toEqual([0, 0, 0]);
    expect(result.states[1]).toEqual({ total: 0, values: [0, 0, 0] });
  });

  it('counts totals, per-type totals, and per-state/type breakdowns', () => {
    const props: Prop[] = [
      buildProp({ state: 1, type: 1 }),
      buildProp({ state: 1, type: 1 }),
      buildProp({ state: 1, type: 2 }),
      buildProp({ state: 3, type: 3 }),
    ];

    const result = calculateRepartition(props);

    expect(result.total).toBe(4);
    expect(result.types).toEqual([2, 1, 1]);
    expect(result.states[1]).toEqual({ total: 3, values: [2, 1, 0] });
    expect(result.states[3]).toEqual({ total: 1, values: [0, 0, 1] });
    expect(result.states[2]).toEqual({ total: 0, values: [0, 0, 0] });
  });
});
