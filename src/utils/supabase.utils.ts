import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const apiUrl = Constants?.expoConfig?.extra?.apiUrl;
const apiKey = Constants?.expoConfig?.extra?.apiKey;

export const supabase = createClient(apiUrl, apiKey);
