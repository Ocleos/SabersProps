import { PropComponent } from './propComponent.model';
import { Prop } from '@src/models/prop.model';
import { PropPrice } from '@src/models/propPrice.model';

export interface PropDetail extends Prop {
  components: PropComponent[];
  prices?: PropPrice;
}
