import type { Prop } from '../types/prop.type';
import { defaultPropFilters } from '../types/propFilters.type';
import { useCollectionStore } from './collection.store';

const getInitialState = () => useCollectionStore.getInitialState();

beforeEach(() => {
  useCollectionStore.setState(getInitialState(), true);
});

describe('useCollectionStore', () => {
  it('starts with the default filters and no selected prop', () => {
    const state = useCollectionStore.getState();

    expect(state.filters).toEqual(defaultPropFilters);
    expect(state.selectedProp).toBeUndefined();
  });

  it('updates the search value without touching other filters', () => {
    useCollectionStore.getState().setSearchValue('graflex');

    const state = useCollectionStore.getState();
    expect(state.filters.searchValue).toBe('graflex');
    expect(state.filters.typesFilter).toBe(defaultPropFilters.typesFilter);
  });

  it('sets and clears the selected prop', () => {
    const prop = { manufacturer: 'KRSabers', name: 'Graflex', state: 1, type: 1 } as Prop;

    useCollectionStore.getState().setSelectedProp(prop);
    expect(useCollectionStore.getState().selectedProp).toBe(prop);

    useCollectionStore.getState().setSelectedProp(undefined);
    expect(useCollectionStore.getState().selectedProp).toBeUndefined();
  });

  it('updates the state filter', () => {
    const states = new Set([1]) as Set<Prop['state']>;

    useCollectionStore.getState().updateStateFilter(states);

    expect(useCollectionStore.getState().filters.statesFilter).toBe(states);
  });

  it('updates the type filter', () => {
    const types = new Set([1]) as Set<Prop['type']>;

    useCollectionStore.getState().updateTypeFilter(types);

    expect(useCollectionStore.getState().filters.typesFilter).toBe(types);
  });
});
