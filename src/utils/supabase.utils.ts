import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

const apiUrl: string = Constants.expoConfig?.extra?.apiUrl;
const apiKey: string = Constants.expoConfig?.extra?.apiKey;

export const supabase = createClient(apiUrl, apiKey, {
  auth: { persistSession: false },
});

export const PROPS_URL_ENDPOINT = 'props';
export const NOTES_URL_ENDPOINT = 'notes';

type Data = {
  id: string | undefined;
};

export const getData = async <T extends Data>(url: string) => {
  const { data } = await supabase.from(url).select();
  return data as T[];
};

export const postData = async <T extends Data>(url: string, { arg }: { arg: T }) => {
  await supabase.from(url).insert(arg);
};

export const putData = async <T extends Data>(url: string, { arg }: { arg: T }) => {
  await supabase.from(url).update(arg).eq('id', arg.id);
};

export const deleteData = async (url: string, { arg }: { arg: string }) => {
  await supabase.from(url).delete().eq('id', arg);
};
