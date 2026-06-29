import { PropState } from './propState.type';
import { PropType } from './propType.type';

export type PropFilters = {
  searchValue: string;
  typesFilter: Set<PropType>;
  statesFilter: Set<PropState>;
};

export const defaultPropFilters: PropFilters = {
  searchValue: '',
  statesFilter: new Set([
    PropState.PRODUCTION,
    PropState.DESIGN,
    PropState.MISSING_PIECES,
    PropState.READY,
    PropState.IN_PROGRESS,
    PropState.DONE,
    PropState.ON_SALE,
    PropState.SOLD,
  ]),
  typesFilter: new Set([PropType.LIGHTSABER, PropType.COSTUME, PropType.PROP]),
};
