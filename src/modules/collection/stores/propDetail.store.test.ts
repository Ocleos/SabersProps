import type { PropComponent } from '../types/propComponent.type';
import type { PropDetail } from '../types/propDetail.type';
import { usePropDetailStore } from './propDetail.store';

const getInitialState = () => usePropDetailStore.getInitialState();

beforeEach(() => {
  usePropDetailStore.setState(getInitialState(), true);
});

describe('usePropDetailStore', () => {
  it('starts empty', () => {
    const state = usePropDetailStore.getState();

    expect(state.propDetail).toBeUndefined();
    expect(state.selectedComponent).toBeUndefined();
    expect(state.searchValue).toBe('');
  });

  it('updates the search value', () => {
    usePropDetailStore.getState().setSearchValue('hilt');

    expect(usePropDetailStore.getState().searchValue).toBe('hilt');
  });

  it('sets and clears the selected component', () => {
    const component = { date: '2023-01-01' } as PropComponent;

    usePropDetailStore.getState().setSelectedComponent(component);
    expect(usePropDetailStore.getState().selectedComponent).toBe(component);

    usePropDetailStore.getState().setSelectedComponent(undefined);
    expect(usePropDetailStore.getState().selectedComponent).toBeUndefined();
  });

  it('replaces the prop detail', () => {
    const detail = { id: '1' } as PropDetail;

    usePropDetailStore.getState().updatePropDetail(detail);
    expect(usePropDetailStore.getState().propDetail).toBe(detail);

    usePropDetailStore.getState().updatePropDetail(undefined);
    expect(usePropDetailStore.getState().propDetail).toBeUndefined();
  });
});
