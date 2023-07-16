import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

const apiUrl: string = Constants.expoConfig?.extra?.apiUrl;
const apiKey: string = Constants.expoConfig?.extra?.apiKey;

export const supabase = createClient(apiUrl, apiKey, {
  auth: { persistSession: false },
});
