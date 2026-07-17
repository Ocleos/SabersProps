import type { Prop } from '~src/modules/collection/types/prop.type';
import type { StateRepartition } from '~src/modules/collection/types/repartition.type';
import { calculateRepartition, getRepartitionTotalForType } from './repartition.utils';

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

describe('getRepartitionTotalForType', () => {
  const buildStates = (overrides: Partial<StateRepartition>): StateRepartition => ({
    1: { total: 0, values: [0, 0, 0] },
    2: { total: 0, values: [0, 0, 0] },
    3: { total: 0, values: [0, 0, 0] },
    4: { total: 0, values: [0, 0, 0] },
    5: { total: 0, values: [0, 0, 0] },
    6: { total: 0, values: [0, 0, 0] },
    7: { total: 0, values: [0, 0, 0] },
    8: { total: 0, values: [0, 0, 0] },
    ...overrides,
  });

  it('sums the values of every state for the given prop type', () => {
    const states = buildStates({
      1: { total: 3, values: [2, 1, 0] },
      3: { total: 1, values: [0, 0, 1] },
    });

    expect(getRepartitionTotalForType(states, '1')).toBe(2);
    expect(getRepartitionTotalForType(states, '2')).toBe(1);
    expect(getRepartitionTotalForType(states, '3')).toBe(1);
  });

  it('returns 0 when no prop of the given type is recorded in any state', () => {
    const states = buildStates({ 1: { total: 3, values: [3, 0, 0] } });

    expect(getRepartitionTotalForType(states, '2')).toBe(0);
  });
});
