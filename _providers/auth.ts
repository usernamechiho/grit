// providers/AuthProvider.tsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSetAtom } from 'jotai';
import { sessionAtom } from '@/_atoms/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) setSession(data.session);
    };

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return children;
};
