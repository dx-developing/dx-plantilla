import { createContext } from 'react'
import type { Session } from './types'

export type AuthContextValue = {
	session: Session | null
	authReady: boolean
	signIn: (email: string, password?: string) => Promise<'local' | 'password' | 'magic-link'>
	signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
