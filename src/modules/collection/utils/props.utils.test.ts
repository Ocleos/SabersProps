import type { Prop } from '../types/prop.type';
import type { PropComponent } from '../types/propComponent.type';
import type { PropFilters } from '../types/propFilters.type';
import { onFilterComponents, onFilterProps } from './props.utils';

const buildProp = (overrides: Partial<Prop>): Prop => ({
  manufacturer: 'KRSabers',
  name: 'Graflex',
  state: 1,
  type: 1,
  ...overrides,
});

const props: Prop[] = [
  buildProp({ name: 'Kylo Ren', state: 1, type: 1 }),
  buildProp({ manufacturer: 'ProffieBoard', name: 'Anakin', state: 2, type: 1 }),
  buildProp({ name: 'Boba Fett Helmet', state: 1, type: 2 }),
];

const buildFilters = (overrides: Partial<PropFilters>): PropFilters => ({
  searchValue: '',
  statesFilter: new Set([1, 2]) as PropFilters['statesFilter'],
  typesFilter: new Set([1, 2]) as PropFilters['typesFilter'],
  ...overrides,
});

describe('onFilterProps', () => {
  it('returns an empty array when props is undefined', () => {
    expect(onFilterProps(undefined, buildFilters({}))).toEqual([]);
  });

  it('filters by type and state', () => {
    const filters = buildFilters({
      statesFilter: new Set([1]) as PropFilters['statesFilter'],
      typesFilter: new Set([1]) as PropFilters['typesFilter'],
    });

    const result = onFilterProps(props, filters);

    expect(result.map((prop) => prop.name)).toEqual(['Kylo Ren']);
  });

  it('filters by search value across every field', () => {
    const filters = buildFilters({ searchValue: 'proffieboard' });

    const result = onFilterProps(props, filters);

    expect(result.map((prop) => prop.name)).toEqual(['Anakin']);
  });

  it('sorts the filtered results by name', () => {
    const filters = buildFilters({});

    const result = onFilterProps(props, filters);

    expect(result.map((prop) => prop.name)).toEqual(['Anakin', 'Boba Fett Helmet', 'Kylo Ren']);
  });
});

const components: PropComponent[] = [
  {
    date: '2023-05-01',
    fees: 0,
    feesEuros: 0,
    idProp: '1',
    label: 'Blade',
    price: 50,
    priceEuros: 50,
    rate: 1,
    seller: 'Amazon',
  },
  {
    date: '2023-01-01',
    fees: 0,
    feesEuros: 0,
    idProp: '1',
    label: 'Hilt',
    price: 100,
    priceEuros: 100,
    rate: 1,
    seller: 'Etsy',
  },
];

describe('onFilterComponents', () => {
  it('returns an empty array when components is undefined', () => {
    expect(onFilterComponents(undefined, '')).toEqual([]);
  });

  it('filters components by search value', () => {
    const result = onFilterComponents(components, 'etsy');

    expect(result.map((component) => component.label)).toEqual(['Hilt']);
  });

  it('sorts the filtered results by date', () => {
    const result = onFilterComponents(components, '');

    expect(result.map((component) => component.label)).toEqual(['Hilt', 'Blade']);
  });
});
