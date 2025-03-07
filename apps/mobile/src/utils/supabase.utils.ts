import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const apiUrl: string = Constants.expoConfig?.extra?.supabaseApiUrl;
const apiKey: string = Constants.expoConfig?.extra?.supabaseApiKey;

export const supabase = createClient(apiUrl, apiKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const PROPS_URL_ENDPOINT = 'props';
export const NOTES_URL_ENDPOINT = 'notes';
export const COMPONENTS_URL_ENDPOINT = 'components';
export const PROPS_PRICES_URL_ENDPOINT = 'propsPrices';
export const PROPS_EXPENSE_URL_ENDPOINT = 'propsExpenses';
export const PROPS_SELLING_PRICE_URL_ENDPOINT = 'sellingPrices';
export const ACCESSORIES_URL_ENDPOINT = 'accessories';
export const PROPS_ACCESSORIES_URL_ENDPOINT = 'propsAccessories';

type Data = {
  id?: string | undefined;
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

export const upsertData = async <T extends Data>(url: string, { arg }: { arg: T }) => {
  await supabase.from(url).upsert(arg);
};

export const deleteData = async (url: string, { arg }: { arg: string }) => {
  await supabase.from(url).delete().eq('id', arg);
};
