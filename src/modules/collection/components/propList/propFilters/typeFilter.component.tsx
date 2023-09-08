import { includes } from 'lodash';
import { Pressable } from 'react-native';
import FilterBadge from '~src/components/list/filterBadge.component';
import { PropType, propTypes } from '~src/models/propType.model';
import { useCollectionStore } from '~src/modules/collection/store/collection.store';

export interface ITypeFilterProps {
  type: PropType;
}

const TypeFilter: React.FC<ITypeFilterProps> = ({ type }) => {
  const { filters, updateTypeFilter } = useCollectionStore();

  const isSelected = includes(filters.typesFilter, type);

  return (
    <Pressable onPress={() => updateTypeFilter(type)}>
      <FilterBadge isSelected={isSelected} colorSelected={'primary'} label={propTypes[type].label} />
    </Pressable>
  );
};

export default TypeFilter;
