import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Supabase configuration is missing. Check SUPABASE_URL and SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(config.supabase.url, config.supabase.anonKey);
