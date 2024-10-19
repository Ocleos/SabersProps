import { PropState } from './propState.model';
import { PropType } from './propType.model';

export type PropFilters = {
  searchValue: string;
  typesFilter: PropType[];
  statesFilter: PropState[];
};

export const defaultPropFilters: PropFilters = {
  searchValue: '',
  statesFilter: [
    PropState.PRODUCTION,
    PropState.DESIGN,
    PropState.MISSING_PIECES,
    PropState.READY,
    PropState.IN_PROGRESS,
    PropState.DONE,
    PropState.ON_SALE,
    PropState.SOLD,
  ],
  typesFilter: [PropType.LIGHTSABER, PropType.COSTUME, PropType.PROP],
};
