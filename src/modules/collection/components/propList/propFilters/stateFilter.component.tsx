import { TouchableHighlight } from '@gorhom/bottom-sheet';
import { includes } from 'lodash';
import FilterBadge from '~src/components/list/filterBadge.component';
import { type PropState, propStates } from '~src/models/propState.model';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';

export interface IStateFilterProps {
  state: PropState;
}

const StateFilter: React.FC<IStateFilterProps> = ({ state }) => {
  const { filters, updateStateFilter } = useCollectionStore();

  const isSelected = includes(filters.statesFilter, state);

  return (
    <TouchableHighlight onPress={() => updateStateFilter(state)}>
      <FilterBadge
        isSelected={isSelected}
        colorSelected={propStates[state].colorScheme}
        label={propStates[state].label}
      />
    </TouchableHighlight>
  );
};

export default StateFilter;
