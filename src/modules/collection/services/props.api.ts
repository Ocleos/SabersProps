import { COMPONENTS_URL_ENDPOINT, PROPS_PRICES_URL_ENDPOINT, supabase } from '~src/utils/supabase.utils';
import { PropDetail } from '../models/propDetail.model';

export const getPropDetail = async (url: string, id?: string) => {
  const { data } = await supabase.from(url).select(`*, ${COMPONENTS_URL_ENDPOINT} (*)`).eq('id', id).single();

  const { data: prices } = await supabase.from(PROPS_PRICES_URL_ENDPOINT).select('*').eq('idProp', id).single();

  return { ...data, prices } as PropDetail;
};
