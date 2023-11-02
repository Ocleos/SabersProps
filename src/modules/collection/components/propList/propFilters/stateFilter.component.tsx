import { Pressable } from '@gluestack-ui/themed';
import { includes } from 'lodash';
import FilterBadge from '~src/components/list/filterBadge.component';
import { PropState, propStates } from '~src/models/propState.model';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';

export interface IStateFilterProps {
  state: PropState;
}

const StateFilter: React.FC<IStateFilterProps> = ({ state }) => {
  const { filters, updateStateFilter } = useCollectionStore();

  const isSelected = includes(filters.statesFilter, state);

  return (
    <Pressable onPress={() => updateStateFilter(state)}>
      <FilterBadge
        isSelected={isSelected}
        colorSelected={propStates[state].colorScheme}
        label={propStates[state].label}
      />
    </Pressable>
  );
};

export default StateFilter;
