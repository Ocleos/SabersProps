import { fireEvent, renderWithProviders, screen } from '~src/test/render.utils';
import { useCollectionStore } from '../../stores/collection.store';
import { PropType } from '../../types/propType.type';
import PropFilters from './propFilters.component';

beforeEach(() => {
  useCollectionStore.setState(useCollectionStore.getInitialState(), true);
});

describe('PropFilters', () => {
  it('renders every type and state as a selectable tag', async () => {
    await renderWithProviders(<PropFilters />);

    expect(screen.getByText('Lightsaber')).toBeTruthy();
    expect(screen.getByText('Prop')).toBeTruthy();
    expect(screen.getByText('Costume')).toBeTruthy();
    expect(screen.getByText('Production')).toBeTruthy();
  });

  it('deselects a type when its tag is pressed, since it starts selected', async () => {
    await renderWithProviders(<PropFilters />);

    fireEvent.press(screen.getByText('Lightsaber'));

    expect(useCollectionStore.getState().filters.typesFilter.has(PropType.LIGHTSABER)).toBe(false);
  });
});
