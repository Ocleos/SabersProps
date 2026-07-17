import { toApiResult, unwrapApiResult } from '~src/utils/apiResult.utils';
import {
  ACCESSORIES_TABLE,
  COMPONENTS_TABLE,
  PROPS_PRICES_TABLE,
  PROPS_TABLE,
  supabase,
} from '~src/utils/supabase.utils';
import type { PropDetail } from '../types/propDetail.type';

export const getPropDetail = async (id: string): Promise<PropDetail | null> => {
  const [propResponse, pricesResponse, accessoriesResponse] = await Promise.all([
    supabase.from(PROPS_TABLE).select(`*, ${COMPONENTS_TABLE} (*)`).eq('id', id).maybeSingle(),
    supabase.from(PROPS_PRICES_TABLE).select('*').eq('id', id).maybeSingle(),
    supabase.from(ACCESSORIES_TABLE).select('*').eq('id', id).maybeSingle(),
  ]);

  const prop = unwrapApiResult(toApiResult(propResponse.data, propResponse.error));

  if (!prop) {
    return null;
  }

  const prices = unwrapApiResult(toApiResult(pricesResponse.data, pricesResponse.error));
  const accessories = unwrapApiResult(toApiResult(accessoriesResponse.data, accessoriesResponse.error));

  return { ...prop, accessories, prices } as PropDetail;
};
