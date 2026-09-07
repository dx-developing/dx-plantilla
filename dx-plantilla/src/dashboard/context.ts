import { createContext } from 'react'
import type { Session } from './types'

export type AuthContextValue = { session: Session | null; signIn: (email: string) => Promise<'local' | 'magic-link'>; signOut: () => Promise<void> }
export const AuthContext = createContext<AuthContextValue | null>(null)
