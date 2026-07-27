import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://aiinontnbzheavxqhniq.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_L-RRu84f3vAG_eNvl7TMNA_KyevDJiM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
