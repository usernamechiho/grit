import { supabase } from '@/lib/supabase';

export async function restoreSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  if (data.session) {
    return data.session;
  }

  return null;
}
