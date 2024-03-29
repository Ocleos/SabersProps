import { TouchableHighlight } from '@gorhom/bottom-sheet';
import { includes } from 'lodash';
import FilterBadge from '~src/components/list/filterBadge.component';
import { type PropType, propTypes } from '~src/models/propType.model';
import { useCollectionStore } from '~src/modules/collection/stores/collection.store';

export interface ITypeFilterProps {
  type: PropType;
}

const TypeFilter: React.FC<ITypeFilterProps> = ({ type }) => {
  const { filters, updateTypeFilter } = useCollectionStore();

  const isSelected = includes(filters.typesFilter, type);

  return (
    <TouchableHighlight onPress={() => updateTypeFilter(type)}>
      <FilterBadge isSelected={isSelected} colorSelected='primary' label={propTypes[type].label} />
    </TouchableHighlight>
  );
};

export default TypeFilter;
