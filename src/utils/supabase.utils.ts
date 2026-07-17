import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import type { User } from '~src/types/user.type';
import { toApiResult, unwrapApiResult } from '~src/utils/apiResult.utils';
import { validateSupabaseConfig } from '~src/utils/supabaseConfig.utils';

const apiUrl: string | undefined = Constants.expoConfig?.extra?.supabaseApiUrl;
const apiKey: string | undefined = Constants.expoConfig?.extra?.supabaseApiKey;

const { apiUrl: validatedApiUrl, apiKey: validatedApiKey } = validateSupabaseConfig(apiUrl, apiKey);

export const supabase = createClient(validatedApiUrl, validatedApiKey, {
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

  return unwrapApiResult(toApiResult((data ?? []) as T[], error));
};

export const postData = async <T extends Data>(tableName: string, value: T) => {
  const { error } = await supabase.from(tableName).insert(value);

  unwrapApiResult(toApiResult(null, error));
};

export const putData = async <T extends Data>(tableName: string, value: T) => {
  const { error } = await supabase.from(tableName).update(value).eq('id', value.id);

  unwrapApiResult(toApiResult(null, error));
};

export const upsertData = async <T extends Data>(tableName: string, value: T) => {
  const { error } = await supabase.from(tableName).upsert(value);

  unwrapApiResult(toApiResult(null, error));
};

export const deleteData = async (tableName: string, id: string) => {
  const { error } = await supabase.from(tableName).delete().eq('id', id);

  unwrapApiResult(toApiResult(null, error));
};

export const getUserData = async () => {
  const { data, error } = await supabase.auth.getUser();

  const { user: userData } = unwrapApiResult(toApiResult(data, error));

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
