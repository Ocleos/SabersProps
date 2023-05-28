import { PropPrice } from './propPrice.model';
import { PropState } from './propState.model';
import { PropType } from './propType.model';

export type Prop = {
  id: string;
  name: string;
  character?: string;
  type: PropType;
  manufacturer: string;
  chassisDesigner?: string;
  state: PropState;
  soundboard?: string;
  prices?: PropPrice;
  apparition?: string;
  color?: string;
};
