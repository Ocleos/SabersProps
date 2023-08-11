import { Prop } from '@src/models/prop.model';
import { supabase } from '@src/utils/supabase.utils';

export const propsUrlEndpoint = 'props';

export const getProps = async (url: string) => {
  const { data } = await supabase.from(url).select();
  return data as Prop[];
};

export const postProp = async (url: string, { arg }: { arg: Prop }) => {
  await supabase.from(url).insert(arg);
};

export const putProp = async (url: string, { arg }: { arg: Prop }) => {
  await supabase.from(url).update(arg).eq('id', arg.id);
};

export const deleteProp = async (url: string, { arg }: { arg: string }) => {
  await supabase.from(url).delete().eq('id', arg);
};
