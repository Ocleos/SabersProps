import { Prop } from '~src/models/prop.model';
import { PropPrice } from '~src/models/propPrice.model';
import { PropComponent } from './propComponent.model';

export interface PropDetail extends Prop {
  components: PropComponent[];
  prices?: PropPrice;
}
