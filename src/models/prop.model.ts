import type { PropState } from './propState.model';
import type { PropType } from './propType.model';

export type Prop = {
  id?: string | undefined;
  name: string;
  state: PropState;
  type: PropType;
  manufacturer: string;
  character?: string | undefined | null;
  chassisDesigner?: string | undefined | null;
  soundboard?: string | undefined | null;
};
