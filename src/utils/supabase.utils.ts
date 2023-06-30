import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

const apiUrl = Constants?.expoConfig?.extra?.apiUrl;
const apiKey = Constants?.expoConfig?.extra?.apiKey;

export const supabase = createClient(apiUrl, apiKey, {
  auth: { persistSession: false },
});
