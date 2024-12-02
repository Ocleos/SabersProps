import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import {
  ACCESSORIES_URL_ENDPOINT,
  COMPONENTS_URL_ENDPOINT,
  PROPS_PRICES_URL_ENDPOINT,
  supabase,
} from '~src/utils/supabase.utils';

export const getPropDetail = async (url: string, id?: string) => {
  const { data } = await supabase.from(url).select(`*, ${COMPONENTS_URL_ENDPOINT} (*)`).eq('id', id).single();

  const { data: prices } = await supabase.from(PROPS_PRICES_URL_ENDPOINT).select('*').eq('id', id).single();

  const { data: accessories } = await supabase.from(ACCESSORIES_URL_ENDPOINT).select('*').eq('id', id).maybeSingle();

  return { ...data, prices, accessories } as PropDetail;
};
