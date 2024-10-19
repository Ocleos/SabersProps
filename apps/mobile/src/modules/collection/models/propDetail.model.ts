import type { Prop } from '~src/models/prop.model';
import type { PropPrice } from '~src/models/propPrice.model';
import type { PropAccessory } from './propAccessory.model';
import type { PropComponent } from './propComponent.model';

export type PropDetail = Prop & {
  components: PropComponent[];
  prices?: PropPrice;
  accessories?: PropAccessory;
};
