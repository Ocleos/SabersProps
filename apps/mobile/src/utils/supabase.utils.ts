import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const apiUrl: string = Constants.expoConfig?.extra?.supabaseApiUrl;
const apiKey: string = Constants.expoConfig?.extra?.supabaseApiKey;

export const supabase = createClient(apiUrl, apiKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
    storage: AsyncStorage,
  },
});

export const ACCESSORIES_TABLE = 'accessories';
export const COMPONENTS_TABLE = 'components';
export const NOTES_TABLE = 'notes';
export const PROPS_TABLE = 'props';
export const PROPS_ACCESSORIES_TABLE = 'propsAccessories';
export const PROPS_EXPENSE_TABLE = 'propsExpenses';
export const PROPS_PRICES_TABLE = 'propsPrices';
export const PROPS_SELLING_PRICE_TABLE = 'sellingPrices';

type Data = {
  id?: string | undefined;
};

export const getData = async <T extends Data>(tableName: string) => {
  const { data } = await supabase.from(tableName).select();
  return data as T[];
};

export const postData = async <T extends Data>(tableName: string, value: T) => {
  await supabase.from(tableName).insert(value);
};

export const putData = async <T extends Data>(tableName: string, value: T) => {
  await supabase.from(tableName).update(value).eq('id', value.id);
};

export const upsertData = async <T extends Data>(tableName: string, value: T) => {
  await supabase.from(tableName).upsert(value);
};

export const deleteData = async (tableName: string, id: string) => {
  await supabase.from(tableName).delete().eq('id', id);
};
