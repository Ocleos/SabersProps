import { supabase } from '~src/utils/supabase.utils';
import { PropDetail } from '../models/propDetail.model';

export const getPropDetail = async (url: string, id?: string) => {
  const { data } = await supabase.from(url).select('*, components (*)').eq('id', id).single();

  return data as PropDetail;
};
