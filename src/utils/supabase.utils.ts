import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import type { User } from '~src/types/user.type';

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
  const { data, error } = await supabase.from(tableName).select();

  if (error) {
    throw new Error(error.message);
  }

  return data as T[];
};

export const postData = async <T extends Data>(tableName: string, value: T) => {
  const { error } = await supabase.from(tableName).insert(value);

  if (error) {
    throw new Error(error.message);
  }
};

export const putData = async <T extends Data>(tableName: string, value: T) => {
  const { error } = await supabase.from(tableName).update(value).eq('id', value.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const upsertData = async <T extends Data>(tableName: string, value: T) => {
  const { error } = await supabase.from(tableName).upsert(value);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteData = async (tableName: string, id: string) => {
  const { error } = await supabase.from(tableName).delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const getUserData = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const userData = data.user;

  let user: User | undefined;

  if (userData) {
    user = {
      displayName: userData.user_metadata.displayName ?? '',
      email: userData.email ?? '',
      id: userData.id,
    };
  }

  return user;
};
