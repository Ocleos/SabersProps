import {
  ACCESSORIES_TABLE,
  COMPONENTS_TABLE,
  PROPS_PRICES_TABLE,
  PROPS_TABLE,
  supabase,
} from '~src/utils/supabase.utils';
import type { PropDetail } from '../types/propDetail.type';

export const getPropDetail = async (id: string) => {
  const { data } = await supabase.from(PROPS_TABLE).select(`*, ${COMPONENTS_TABLE} (*)`).eq('id', id).maybeSingle();

  if (!data) {
    return null;
  }

  const { data: prices } = await supabase.from(PROPS_PRICES_TABLE).select('*').eq('id', id).maybeSingle();

  const { data: accessories } = await supabase.from(ACCESSORIES_TABLE).select('*').eq('id', id).maybeSingle();

  return { ...data, accessories, prices } as PropDetail;
};
