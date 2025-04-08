
import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

const supabaseUrl = 'https://rsqahlgtiaznjqwwvqtl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcWFobGd0aWF6bmpxd3d2cXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjU3NTUsImV4cCI6MjA1OTcwMTc1NX0.o5tUoWxrgGLir-bYNmmn6gMRta3rwL_JaZSMi1YvBkU';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
