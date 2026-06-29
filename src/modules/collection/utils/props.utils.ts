import { searchValueInObject } from '~src/utils/objects.utils';
import type { Prop } from '../types/prop.type';
import type { PropComponent } from '../types/propComponent.type';
import type { PropFilters } from '../types/propFilters.type';

export const onFilterProps = (props: Prop[] | undefined, filters: PropFilters) => {
  let filteredProps: Prop[] = [];

  if (props) {
    const filteredData = props.filter((item) => {
      const isTypeIncluded = filters.typesFilter.has(item.type);
      const isStateIncluded = filters.statesFilter.has(item.state);
      const isSearchIncluded = searchValueInObject(filters.searchValue, item);

      return isSearchIncluded && isStateIncluded && isTypeIncluded;
    });

    // Sort data
    filteredProps = [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
  }

  return filteredProps;
};

export const onFilterComponents = (components: PropComponent[] | undefined, searchValue: string) => {
  let filteredComponents: PropComponent[] = [];

  if (components) {
    const filteredData = components.filter((item) => {
      const isSearchIncluded = searchValueInObject(searchValue, item);

      return isSearchIncluded;
    });

    // Sort data
    filteredComponents = [...filteredData].sort((a, b) => a.date.localeCompare(b.date));
  }
  return filteredComponents;
};
