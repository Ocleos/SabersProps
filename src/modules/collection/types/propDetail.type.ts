import type { Prop } from './prop.type';
import type { PropAccessory } from './propAccessory.type';
import type { PropComponent } from './propComponent.type';
import type { PropPrice } from './propPrice.type';

export type PropDetail = Prop & {
  components: PropComponent[];
  prices?: PropPrice;
  accessories?: PropAccessory;
};
