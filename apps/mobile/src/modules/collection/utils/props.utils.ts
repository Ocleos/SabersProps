import { alphabetical } from 'radash';
import type { Prop } from '~src/models/prop.model';
import type { PropFilters } from '~src/models/propFilters.model';
import { searchValueInObject } from '~src/utils/arrays.utils';
import type { PropComponent } from '../models/propComponent.model';

export const onFilterProps = (props: Prop[] | undefined, filters: PropFilters) => {
  let filteredProps: Prop[] = [];

  if (props) {
    const filteredData = props.filter((item) => {
      const isTypeIncluded = filters.typesFilter.includes(item.type);
      const isStateIncluded = filters.statesFilter.includes(item.state);
      const isSearchIncluded = searchValueInObject(filters.searchValue, item);

      return isSearchIncluded && isStateIncluded && isTypeIncluded;
    });

    // Sort data
    filteredProps = alphabetical(filteredData, (value) => value.name);
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
    filteredComponents = alphabetical(filteredData, (value) => value.date);
  }
  return filteredComponents;
};
