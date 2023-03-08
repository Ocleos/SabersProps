import { ItemPrice } from './itemPrice.model';
import { ItemType } from './itemType.model';
import { State } from './state.model';

export type ItemCollection = {
  id: string;
  name: string;
  character?: string;
  type: ItemType;
  manufacturer: string;
  chassisDesigner: string;
  state: State;
  soundboard?: string;
  prices?: ItemPrice;
  apparition?: string;
  color?: string;
};
