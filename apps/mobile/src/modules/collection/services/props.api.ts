import type { PropDetail } from '~src/modules/collection/models/propDetail.model';
import {
  ACCESSORIES_TABLE,
  COMPONENTS_TABLE,
  PROPS_PRICES_TABLE,
  PROPS_TABLE,
  supabase,
} from '~src/utils/supabase.utils';

export const getPropDetail = async (id: string) => {
  const { data } = await supabase.from(PROPS_TABLE).select(`*, ${COMPONENTS_TABLE} (*)`).eq('id', id).single();

  const { data: prices } = await supabase.from(PROPS_PRICES_TABLE).select('*').eq('id', id).single();

  const { data: accessories } = await supabase.from(ACCESSORIES_TABLE).select('*').eq('id', id).maybeSingle();

  return { ...data, accessories, prices } as PropDetail;
};
