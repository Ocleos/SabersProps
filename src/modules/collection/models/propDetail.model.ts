import type { Prop } from '~src/models/prop.model';
import type { PropPrice } from '~src/models/propPrice.model';
import type { PropComponent } from './propComponent.model';

export interface PropDetail extends Prop {
  components: PropComponent[];
  prices?: PropPrice;
}
