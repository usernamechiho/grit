import { atom } from 'jotai';
import { Session } from '@supabase/supabase-js';

export const sessionAtom = atom<Session | null>(null);
