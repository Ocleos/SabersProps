import { PropPrice } from './propPrice.model';
import { PropType } from './propType.model';
import { State } from './state.model';

export type Prop = {
  _id: string;
  name: string;
  character?: string;
  type: PropType;
  manufacturer: string;
  chassisDesigner?: string;
  state: State;
  soundboard?: string;
  prices?: PropPrice;
  apparition?: string;
  color?: string;
};
